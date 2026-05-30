import axios from "axios";
import { CLIENT_ID, CLIENT_SECRET } from "../configs/authConfig";
import { ClientCredentialTokenResponse, ExchangeTokenResponse, TokenResponse } from "../models/auth";
import { generateCodeChallenge, generateCodeVerifier } from "../utils/pkce";
import {
  consumeCodeVerifier,
  setCodeVerifier,
  setTokens,
} from "../utils/tokenStorage";
import { REDIRECT_URI } from "../configs/commonConfig";

const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SCOPES = "user-read-private user-read-email";



const encodedBase64 = (data: string): string => {
  if (typeof window !== "undefined") {
    return btoa(data);
  } else {
    return Buffer.from(data).toString("base64");
  }
};

export const getClientCredentialToken =
  async (): Promise<ClientCredentialTokenResponse> => {
    try {
      const body = new URLSearchParams({
        grant_type: "client_credentials",
      });
      const response = await axios.post(
        "https://accounts.spotify.com/api/token",
        body,
        {
          headers: {
            Authorization: `Basic ${encodedBase64(CLIENT_ID + ":" + CLIENT_SECRET)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new Error(`Fail to fetch client credential token`, {
        cause: error,
      });
    }
  };




export const redirectToSpotifyAuth = async (): Promise<void> => {
  const verifier = generateCodeVerifier();
  const challenge = await generateCodeChallenge(verifier);
  setCodeVerifier(verifier);

  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    code_challenge_method: "S256",
    code_challenge: challenge,
    scope: SCOPES,
  });

  window.location.assign(`${SPOTIFY_AUTH_URL}?${params.toString()}`);
};

export const exchangeCodeForToken = async (code: string): Promise<void> => {
  const verifier = consumeCodeVerifier();
  if (!verifier) throw new Error("Missing PKCE code verifier");

  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
    code_verifier: verifier,
  });

  const response = await axios.post<TokenResponse>(SPOTIFY_TOKEN_URL, body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  setTokens(
    response.data.access_token,
    response.data.refresh_token,
    response.data.expires_in
  );
};

export const refreshAccessToken = async (refreshToken: string): Promise<void> => {
  const body = new URLSearchParams({
    client_id: CLIENT_ID,
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await axios.post<TokenResponse>(SPOTIFY_TOKEN_URL, body, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  setTokens(
    response.data.access_token,
    response.data.refresh_token ?? refreshToken,
    response.data.expires_in
  );
};


export const exchangeToken = async (code:string, codeVerifier:string): Promise<ExchangeTokenResponse> => {

  try {

    const url = "https://accounts.spotify.com/api/token";

    if (!CLIENT_ID || !REDIRECT_URI) {
      throw new Error("Missing required parameters");
    }

    console.log("REDIRECT_URI:", REDIRECT_URI);
    const body = new URLSearchParams({
      client_id: CLIENT_ID,
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
      code_verifier: codeVerifier,
    });

    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });


    return response.data;



  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Spotify가 준 진짜 에러 ({ error, error_description })를 그대로 출력
      console.error(
        "Token exchange failed:",
        error.response?.status,
        error.response?.data
      );
    } else {
      console.error("Token exchange failed:", error);
    }
    throw new Error("Failed to fetch token");
  }

}  

