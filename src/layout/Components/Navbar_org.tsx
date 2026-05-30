


import React from "react";

import LoginButton from "../../Common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";

import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  styled,
  useMediaQuery,
} from "@mui/material";

const ProfileContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: "8px",
});

const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});

const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});


const Navbar = () => {
  const { data: userProfile } = useGetCurrentUserProfile();
  return (
    <Box sx={{ display: "flex", 
               justifyContent: "flex-end", 
               alignItems: "center",
               height: "64px"
              }}>
        {userProfile ? (
          <ProfileContainer>
            <IconButton onClick={handleMenuOpen} size="small">
              <Avatar
                src={userProfile.images[0]?.url}
                alt={userProfile.display_name}
              />
            </IconButton>
            <ProfileMenu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              keepMounted
            >
              <ProfileMenuItem onClick={logout}>Log out</ProfileMenuItem>
            </ProfileMenu>
          </ProfileContainer>
        ) : (
          <LoginButton />
        )}
    </Box>
    );
};

export default Navbar;


