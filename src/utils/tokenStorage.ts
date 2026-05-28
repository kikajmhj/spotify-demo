const ACCESS_TOKEN_KEY = "spotify_access_token";
const REFRESH_TOKEN_KEY = "spotify_refresh_token";
const EXPIRES_AT_KEY = "spotify_token_expires_at";
const CODE_VERIFIER_KEY = "spotify_code_verifier";
const TOKEN_CHANGED_EVENT = "spotify-token-changed";

export const setTokens = (
  accessToken: string,
  refreshToken: string | undefined,
  expiresInSec: number
): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(EXPIRES_AT_KEY, String(Date.now() + expiresInSec * 1000));
  window.dispatchEvent(new Event(TOKEN_CHANGED_EVENT));
};

export const getAccessToken = (): string | null => {
  const expiresAt = Number(localStorage.getItem(EXPIRES_AT_KEY) ?? 0);
  if (expiresAt && Date.now() >= expiresAt) return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

export const getRefreshToken = (): string | null =>
  localStorage.getItem(REFRESH_TOKEN_KEY);

export const clearTokens = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(EXPIRES_AT_KEY);
  window.dispatchEvent(new Event(TOKEN_CHANGED_EVENT));
};

export const setCodeVerifier = (verifier: string): void => {
  localStorage.setItem(CODE_VERIFIER_KEY, verifier);
};

export const consumeCodeVerifier = (): string | null => {
  const verifier = localStorage.getItem(CODE_VERIFIER_KEY);
  localStorage.removeItem(CODE_VERIFIER_KEY);
  return verifier;
};

export const subscribeToTokenChanges = (callback: () => void): (() => void) => {
  window.addEventListener("storage", callback);
  window.addEventListener(TOKEN_CHANGED_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(TOKEN_CHANGED_EVENT, callback);
  };
};
