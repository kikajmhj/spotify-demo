import { Button } from "@mui/material";
import React from "react";
import { redirectToSpotifyAuth } from "../../apis/authApi";
import useAccessToken from "../../hooks/useAccessToken";
import { clearTokens } from "../../utils/tokenStorage";

const LoginButton = () => {
  const accessToken = useAccessToken();
  const isLoggedIn = !!accessToken;

  const handleClick = () => {
    if (isLoggedIn) {
      clearTokens();
    } else {
      redirectToSpotifyAuth();
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      size="large"
      onClick={handleClick}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </Button>
  );
};

export default LoginButton;
