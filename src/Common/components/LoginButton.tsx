import { Button } from "@mui/material";
import React from "react";
import { redirectToSpotifyAuth } from "../../apis/authApi";

const LoginButton = () => {
  const login = () => {
    redirectToSpotifyAuth();
  };
  return (
    <Button variant="contained" color="secondary" size="large" onClick={login}>
      Login
    </Button>
  );
};

export default LoginButton;
