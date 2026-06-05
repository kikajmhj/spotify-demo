import { Box, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
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

const EmptyPlaylistWithSearch = () => {
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
      <Typography variant="h1" my="10px">
        Let's find something for your playlist
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword} />
      <div>
        {isLoading ? (
          <LoadingSpinner /> 
        ) : hasResults ? (
          <SearchResultList 
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
