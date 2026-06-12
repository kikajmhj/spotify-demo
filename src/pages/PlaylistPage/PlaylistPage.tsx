
import { Box, styled } from "@mui/material";
import LibraryHead from "../../layout/Components/LibraryHead";
import Library from "../../layout/Components/Library";




const Container = styled (Box) ( {
  height: "100%",
  display: "flex",
  flexDirection: "column"
});


const PlaylistPage = () => {
  return (
    <Container>
      <LibraryHead />

      <Library />

    </Container>
   
  );
};

export default PlaylistPage;
