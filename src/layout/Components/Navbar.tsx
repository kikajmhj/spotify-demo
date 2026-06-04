


import React from "react";

import LoginButton from "../../Common/components/LoginButton";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { clearTokens } from "../../utils/tokenStorage";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";


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

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const queryClient = useQueryClient();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {

    clearTokens();
    queryClient.removeQueries({
      queryKey: ["current-user-profile"],
    });
    queryClient.removeQueries({
      queryKey: ["current-user-playlist"],
    });

    handleMenuClose();
  };


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


