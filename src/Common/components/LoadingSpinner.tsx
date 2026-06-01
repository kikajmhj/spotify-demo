import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface LoadingSpinnerProps {
  size?: number;
}

const LoadingSpinner = ({ size = 24 }: LoadingSpinnerProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
    >
      <CircularProgress size={size} color="secondary" />
    </Box>
  );
};

export default LoadingSpinner;
