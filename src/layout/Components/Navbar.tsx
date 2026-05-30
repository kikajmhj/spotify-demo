
import { Box } from "@mui/material";

import React from "react";

import LoginButton from "../../Common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";


const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  return (
    <Box sx={{ display: "flex", 
               justifyContent: "flex-end", 
               alignItems: "center",
               height: "64px"
              }}>
        {userProfile ? userProfile.display_name : <LoginButton />}
    </Box>
    );
};

export default Navbar;


