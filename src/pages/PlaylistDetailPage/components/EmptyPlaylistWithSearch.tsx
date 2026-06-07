import { Box, InputAdornment, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import SearchResultList from "./SearchResultList";
import LoadingSpinner from "../../../Common/components/LoadingSpinner";

const SearchContainer = styled(Box)({
  padding: "16px",
  width: "100%",
  height: "100%",
  overflowY: "auto",

  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",

  "& .MuiInputBase-root": {
    borderRadius: "4px", 
    backgroundColor: theme.palette.action.active, 
    color: "white", 
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", 
    },
    "&:hover fieldset": {
      borderColor: "gray",
    },
    "&.Mui-focused fieldset": {
      borderColor: "gray", 
    },
  },
}));

interface EmptyPlaylistWithSearchProps {
  playlist_id: string;
}

const EmptyPlaylistWithSearch = ({ playlist_id }: EmptyPlaylistWithSearchProps) => {

  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
  const hasResults = tracks.length > 0;

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <SearchContainer>
      <Box display="inline-block">
        <Typography variant="h1" my="10px">
          Let's find something for your playlist
        </Typography>

        <StyledTextField
          value={keyword}
          autoComplete="off"
          variant="outlined"
          placeholder="Search for songs or episodes"
          fullWidth
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon style={{ color: "white" }} />
                </InputAdornment>
              ),
            },
          }}
          onChange={handleSearchKeyword}
        />
      </Box>

      <div>
        {isLoading ? (
          <LoadingSpinner /> 
        ) : hasResults ? (
          <SearchResultList
            playlist_id = {playlist_id}
            list={tracks}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        ) : keyword === "" ? (
          <></> 
        ) : (
          <div>{`No Result for "${keyword}"`}</div> 
        )}
      </div>
    </SearchContainer>
  );
};

export default EmptyPlaylistWithSearch;
