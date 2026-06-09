import { useParams, useNavigate } from 'react-router';
import { Box, Grid, Typography, TextField, InputAdornment, styled } from '@mui/material';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import LoadingSpinner from '../../Common/components/LoadingSpinner';
import ErrorMessage from '../../Common/components/ErrorMessage';

import SearchIcon from '@mui/icons-material/Search';              
import React, { useState } from 'react';                          



import TopResult from './components/TopResult';
import SongList from './components/SongList';
import ArtistList from './components/ArtistList';
import AlbumList from './components/AlbumList';


const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    borderRadius: '4px',
    backgroundColor: theme.palette.action.active,
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': { borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: 'gray' },
    '&.Mui-focused fieldset': { borderColor: 'gray' },
  },
}));




const SearchWithKeywordPage = () => {
  const { keyword } = useParams();
  const navigate = useNavigate();

  const [value, setValue] = useState(keyword || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) navigate(`/search/${value.trim()}`);
  };


  const {data, isLoading, error} = useSearchItemsByKeyword( {
    q: keyword || "",
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Artist, SEARCH_TYPE.Album]
  } )

  console.log ("search result of useSearchItemsByKeyword: ", data)

  const searchBar = (
    <form onSubmit={handleSubmit}>
      <StyledTextField
        value={value}
        autoComplete="off"
        variant="outlined"
        placeholder="Search for songs or episodes"
        fullWidth
        onChange={(e) => setValue(e.target.value)}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: 'white' }} />
              </InputAdornment>
            ),
          },
        }}
      />
    </form>
  );


  if (isLoading)     
    return <Box sx={{ p: 2 }}>{searchBar}<LoadingSpinner /></Box>;
  if (error) return <ErrorMessage errorMessage="Search Error" />;

  const result = data?.pages[0];
  const tracks = result?.tracks?.items ?? [];
  const artists = result?.artists?.items ?? [];
  const albums = result?.albums?.items ?? [];

  if ( !tracks.length && ! artists.length && ! albums.length) {
    return (
      <Typography variant="h2" sx = {{ p:2}} >
      No result for "{keyword}"
      </Typography>
    );
  }

  return (
    <Box sx = {{ p:2}}>

        {searchBar}

        <Grid container spacing ={4} sx = {{mt:3, mb:4}} >
          <Grid size = {{xs:12, md:4}} >
            <Typography variant="h1" sx={{ mb:2}}>Top result</Typography>
            {tracks[0] && <TopResult track={tracks[0]} />}
          </Grid>
          <Grid size = {{ xs:12, md: 8}}>
            <Typography variant = "h1" sx = {{mb:2}}> Songs </Typography>
            <SongList tracks = {tracks.slice(0,4)} />
          </Grid>
        </Grid>

      {/*mid  */}
      {artists.length >0 && (
        <>
          <Typography variant="h1" sx= {{mb:2}}>Artists</Typography>
          <ArtistList artists = {artists} />
        </>
      )}

      {/*bottom */}
      {albums.length > 0 && (
        <>
          <Typography variant="h1" sx = {{mt:4, mb:2}}>Albums</Typography>
          <AlbumList albums={albums} />
        </>
      )}
      </Box>
  );
};

export default SearchWithKeywordPage;
