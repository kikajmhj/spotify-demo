import { Box, Typography } from "@mui/material";
//import LoginButton from "./LoginButton_r0";
import LoginButton from "./LoginButton";
const LoginRequired = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100%"
      flexDirection="column"
    >
      <Typography variant="h2" sx={{ fontWeight: 700, mb: "20px" }}>
        다시 로그인 하세요
      </Typography>
      <LoginButton />
    </Box>
  );
};

export default LoginRequired;
