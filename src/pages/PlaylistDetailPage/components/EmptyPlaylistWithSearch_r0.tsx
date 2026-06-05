
import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';

const   EmptyPlaylistWithSearch = () => {

    const [keyword, setKeyword] = useState<string>("");

    const { data } = useSearchItemsByKeyword ( {
            q: keyword,
            type: [SEARCH_TYPE.Track],
    }
    );

    console.log ("search ddd", data)

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }

    return (
        <div> 
            <Typography variant = "h1" my="10px">
                Let's find something for your playlist
            </Typography>

            <TextField value= {keyword} onChange={handleSearchKeyword} />
            {data?.pages.map((item) => {
                if (!item.tracks) return false;
                return <SearchResultList list = {item.tracks?.items} />;
            } )}

        </div>
    );
}

export default EmptyPlaylistWithSearch;