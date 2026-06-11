import { useMemo } from "react";
import { Typography, Grid } from "@mui/material";
import Card from "../../../Common/components/Card";
import LoadingSpinner from "../../../Common/components/LoadingSpinner";
import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../../models/search";
import { pickRandomKeyword } from "./homeKeywords";



const Albums = () => {

    const keyword = useMemo( ()=> pickRandomKeyword(), []);


    const {data, isPending} = useSearchItemsByKeyword( {
        q: keyword,
        type:[SEARCH_TYPE.Album],
        limit:6,
    });

    const albums = data?.pages.flatMap((p)=> p.albums?.items ??[]) ?? [];

    return (
        <div>
            <Typography variant="h1" sx={{ paddingTop: "8px"}}>
                Albums
            </Typography>

            {isPending ? (
                <LoadingSpinner />
            ) : albums.length > 0 ? (

                <Grid container spacing={2}>
                    {albums.map ((album) => (
                        <Grid size = {{xs:6, sm:4, md:2}} key = {album.id}>
                            <Card    
                                name={album.name}
                                artistName = {album.artists.map((a) => a.name).join(", ")}
                                image = {album.images?.[0]?.url}
                            />
                        </Grid>   
                    ))}
                </Grid>
            ): (
                <Typography variant="h2"> No data </Typography>
            )}
 
        </div>
    );
};


export default Albums;