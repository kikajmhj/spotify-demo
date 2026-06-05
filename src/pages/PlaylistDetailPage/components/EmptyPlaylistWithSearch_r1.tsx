
import React, { useState } from 'react';
import { TextField, Typography } from '@mui/material';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResultList from './SearchResultList';
import LoadingSpinner from '../../../Common/components/LoadingSpinner';

const   EmptyPlaylistWithSearch = () => {

    const [keyword, setKeyword] = useState<string>("");

    const { data, isLoading } = useSearchItemsByKeyword ( {
            q: keyword,
            type: [SEARCH_TYPE.Track],
    }
    );

    const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    }

    
    const tracks = data?.pages.flatMap((page) => page.tracks?.items ?? []) ?? [];
    const hasResults = tracks.length > 0;

    return (
        <div>
            <Typography variant = "h1" my="10px">
                Let's find something for your playlist
            </Typography>

            <TextField value= {keyword} onChange={handleSearchKeyword} />

            <div>
                {isLoading ? (
                    <LoadingSpinner />
                ) : hasResults ? (
                    <SearchResultList list={tracks} />
                ) : keyword === "" ? (
                    <></>
                ) : (
                    <div>{`No Result for "${keyword}"`}</div>
                )}
            </div>

        </div>
    );
}

export default EmptyPlaylistWithSearch;




