export const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID as string;

export const redirectUri =
  process.env.REACT_APP_SPOTIFY_REDIRECT_URI ?? "http://127.0.0.1:3000/callback";

export const scopes = [
  "user-read-private",
  "user-read-email",
  "playlist-read-private",
  "user-library-read",
  "user-top-read",
].join(" ");
