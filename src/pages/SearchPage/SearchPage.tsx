import { TextField, Grid, Typography, Box, InputAdornment, styled } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CATEGORIES } from '../../configs/categories';
import CategoryCard from './components/CategoryCard';


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



const SearchPage = () => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) navigate (`/search/${keyword.trim()}`);

  };
  
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };


  return (
    
    <Box sx = {{p:2 }}>
      <form onSubmit = {handleSubmit}>
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
      </form>

      <Typography variant="h1" sx= {{my:2}}>Browse all</Typography>
      <Grid container spacing={2}>
        { CATEGORIES.map ((cat) => (
          <Grid size = {{xs:6, sm:4, md:3}} key = {cat.id}>
            <CategoryCard category={cat} />
          </Grid>

        ))   }

      </Grid>



    </Box>


  );
};

export default SearchPage;