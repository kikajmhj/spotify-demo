export const SPOTIFY_BASE_URL = process.env.SPOTIFY_BASE_URL;

const defaultRedirectUri =
  typeof window !== "undefined" ? `${window.location.origin}/callback` : "";

export const REDIRECT_URI =
  process.env.REACT_APP_REDIRECT_URI?.trim() || defaultRedirectUri;
