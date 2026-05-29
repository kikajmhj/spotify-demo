import axios from "axios";
import { CLIENT_ID } from "../configs/authConfig";
import { ExchangeTokenResponse, TokenResponse } from "../models/auth";
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
    throw new Error("Failed to fetch token");
  }

}  
