
import { Track } from "../../../models/track";
import {
  Box,
  Button,
  styled,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

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
interface SearchResultListProps {
  list: Track[];
}
const SearchResultList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      {list.map((track) => (
        <StyledTableRow key={track.id}>
          <TableCell>
            <Box display="flex" alignItems="center">
              <Box>
                <AlbumImage src={track.album?.images[0].url} width="40px" />
              </Box>
              <Box>
                <Typography fontWeight={700}>{track.name}</Typography>
                <Typography color="text.secondary">
                  {track.artists ? track.artists[0].name : "Unknown Artist"}
                </Typography>
              </Box>
            </Box>
          </TableCell>
          <TableCell>{track.album?.name}</TableCell>
          <TableCell>
            <Button>Add</Button>
          </TableCell>
        </StyledTableRow>
      ))}
    </div>
  );
};

export default SearchResultList;


