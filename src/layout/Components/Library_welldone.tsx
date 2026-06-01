
import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylist";

import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";


const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
  const { data, isLoading, error } = useGetCurrentUserPlaylists({
    limit: 15,
    offset: 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>플레이리스트를 불러오지 못했습니다.</div>;

  return (
    <div>
      {!data || data.total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
          <Playlist playlists={data.items} />
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;

