import { CLIENT_ID, SCOPES } from "../configs/authConfig";
import { REDIRECT_URI } from "../configs/commonConfig";
import { AuthUrlParams } from "../models/auth";
import { base64encode, generateRandomString, sha256 } from "./crypto";

// 같은 로그인이 두 번 실행돼도(더블클릭 등) 두 번째 호출이
// code_verifier를 덮어쓰지 못하게 막는 가드.
// 한 번 시작되면 페이지가 Spotify로 이동하므로, 다음 로드 때 자동으로 false로 초기화된다.
let authInProgress = false;

export const getSpotifyAuthUrl = async () => {
    if (authInProgress) return;
    authInProgress = true;

    const codeVerifier = generateRandomString(64);
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    const clientId = CLIENT_ID;
    const redirectUri = REDIRECT_URI;

    const scope = SCOPES;
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    if (clientId && redirectUri) {
        // 실제로 이동할 때만 verifier를 저장한다 (challenge와 항상 한 쌍이 되도록).
        window.localStorage.setItem('code_verifier', codeVerifier);

        console.log("[LOGIN] code_verifier stored:", codeVerifier);
        console.log("[LOGIN] code_challenge sent  :", codeChallenge);

        const params: AuthUrlParams = {
            response_type: 'code',
            client_id: clientId,
            scope,
            code_challenge_method: 'S256',
            code_challenge: codeChallenge,
            redirect_uri: redirectUri,
            show_dialog: 'true',   // ← 추가
        };

        authUrl.search = new URLSearchParams(Object.entries(params)).toString();
        window.location.href = authUrl.toString();
    } else {
        // 이동하지 않았으면 다시 시도할 수 있게 가드 해제
        authInProgress = false;
    }
};
