import { TextField, Grid, Typography, Box } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { CATEGORIES } from '../../configs/categories';
import CategoryCard from './components/CategoryCard';




const SearchPage = () => {

  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) navigate (`/search/${keyword.trim()}`);

  };
  

  return (
    
    <Box sx = {{p:2 }}>
      <form onSubmit = {handleSubmit}>
        <TextField
          fullWidth
          placeholder="What do you want to play?"
          value= {keyword}
          onChange= {(e) => setKeyword (e.target.value)}
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