import React from "react";
import { useLocation, useNavigate } from "react-router";
import {
  BottomNavigation,
  BottomNavigationAction,
  Paper,
  styled,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import BookmarkIcon from "@mui/icons-material/Bookmark";



const MobileNavWrapper = styled (Paper) (({ theme}) => ({
    position: "fixed",
    bottom: 0,
    left: 0,
    right:0,
    zIndex: theme.zIndex.appBar,

    [theme.breakpoints.up("sm")]: {
        display: "None",
    },

}));

const StyledBottomNavigation = styled (BottomNavigation) (({theme}) => ({
    backgroupdColor: theme.palette.background.paper,
    "& .MuiBottomNavigationAction-root": {
        color: theme.palette.text.secondary,
    },
    "&. Mui-selected": {
        color: theme.palette.text.primary,
    },
}));

const getValueFromPath = (pathname: string) => {

    if (pathname === "/") return "/";
    if (pathname.startsWith("/search")) return "/search";
    if (pathname.startsWith("/playlist")) return "/playlist";
    
    return "/";

};

const MobileNav = () =>  {

    const navigate = useNavigate();
    const {pathname} = useLocation();

    return (
        <MobileNavWrapper elevation= {3} >
            <StyledBottomNavigation
                showLabels
                value = {getValueFromPath(pathname)}
                onChange= {(_, newValue ) => navigate(newValue)}
            >

                <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
                <BottomNavigationAction
                    label="Search"
                    value="/search"
                    icon ={<SearchIcon />}
                />


                <BottomNavigationAction
                    label = "Your Library"
                    value ="/playlist"
                    icon = {<BookmarkIcon />}
                />
            </StyledBottomNavigation>
        </MobileNavWrapper>
    );
};

export default MobileNav;

