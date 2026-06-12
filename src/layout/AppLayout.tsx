import {styled, Box, Typography} from "@mui/material";

import React from "react";
import {NavLink,Outlet} from "react-router";


import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from "./Components/LibraryHead";
import Library from "./Components/Library";
import Navbar from "./Components/Navbar";

import MobileNav from "./Components/MobileNav";

const Layout = styled ("div") ({
  display: 'flex',
  height: '100vh',
  padding: '8px',
})

const Sidebar = styled ("div")(({theme}) => ({
  width: '331px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: "none",
  }
}))

const ContentBox = styled (Box) (({theme}) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',
}))

const NavList = styled ("ul") ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const StyledNavLink = styled(NavLink) (({theme}) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  color: theme.palette.text.secondary,
  "&:hover": {
    color: theme.palette.text.primary,
  },
  "&.active": {
    color: theme.palette.text.primary,  
  }
}))

const AppLayout = () => {
  return (
    <Layout>
      <Sidebar>
        <ContentBox> 
          <NavList>
            <StyledNavLink to= "/">
              <HomeIcon />
               <Typography variant="h2" sx={{ fontWeight: 700 }}>Home</Typography>
             </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography variant="h2" sx={{ fontWeight: 700 }}>Search</Typography>
            </StyledNavLink>
          </NavList>  
        </ContentBox>
         <ContentBox sx={{ height: '100%'}}>
          <LibraryHead />
          <Library/>
         </ContentBox> 

      </Sidebar>
      <ContentBox sx={{ overflowY: 'auto', pb: { xs: "72px", sm: "8px" }, }}>
        <Navbar />
        <Outlet />
      </ContentBox>

      <MobileNav />
    </Layout>
  );
};




export default AppLayout;
