import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingSpinner from "../../../Common/components/LoadingSpinner";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
}));
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});
const AlbumPlaceholder = styled("div")({
  width: "40px",
  height: "40px",
  borderRadius: "4px",
  marginRight: "12px",
  backgroundColor: "#282828",
});

interface SearchResultListProps { 
  playlist_id: string;
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
}

const SearchResultList = ({
  playlist_id,
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
}: SearchResultListProps) => {

  const { mutate: addItem } = useAddItemToPlaylist();

  const handleAddItem = (track: Track) => {
    
    if (!track.uri) return;

    console.log("track.id :", track.id);
    console.log("track.uri:", track.uri);

    addItem({ playlist_id: playlist_id, uris: [track.uri] });
  };


  const { ref, inView } = useInView(); 

  useEffect(() => { 
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage]);

  return (
    <StyledTableContainer>
      <TableBody sx={{ width: "100%" }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell>
              <Box display="flex" alignItems="center">
                <Box>
                  {track.album?.images?.[0]?.url ? (
                    <AlbumImage src={track.album.images[0].url} width="40px" />
                  ) : (
                    <AlbumPlaceholder />
                  )}
                </Box>
                <Box>
                  <Typography fontWeight={700}>{track.name}</Typography>
                  <Typography color="text.secondary">
                    {track.artists ? track.artists[0].name : "Unknown Artist"}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
               {track.album?.name}
            </TableCell>
            <TableCell>
              <Button onClick={() => handleAddItem(track)}>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
       
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage && <LoadingSpinner />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;
