import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import styled from '@emotion/styled';
import { Grid } from '@mui/material';


const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));





const PlaylistDetailPage = () => {

  const { id } = useParams<{ id: string }>();

  if (id === undefined)  return <Navigate to="/" />;

  const { data: playlist } = useGetPlaylist({playlist_id: id})

  console.log("ddd, playlist detail: ", playlist);

  return (
    <div>Playlist Detail Page: {id}</div>
  );
};

export default PlaylistDetailPage;
