import { SEARCH_TYPE } from "../../../models/search";
import { pickRandomKeyword } from "./homeKeywords"
import { Grid, Typography } from "@mui/material";
import Card from "../../../Common/components/Card";
import LoadingSpinner from "../../../Common/components/LoadingSpinner";
import { useMemo } from "react";


import useSearchItemsByKeyword from "../../../hooks/useSearchItemsByKeyword";

const Tracks = () => {

    const keyword = useMemo(() => pickRandomKeyword(), []);

    const {data, isPending} = useSearchItemsByKeyword ( {
        q: keyword,
        type: [SEARCH_TYPE.Track],
        limit: 6,
    })

    const tracks = data?.pages.flatMap((p)=> p.tracks?.items ?? []) ?? [];

    return (
        <div>
            <Typography variant ="h1" sx={{ paddingTop: "8px"}}>
                Track
            </Typography>
            {isPending ? (
                <LoadingSpinner />
            ) : tracks.length > 0 ? (
                <Grid container spacing={2}>
                    {tracks.map ((track) => (
                        <Grid size = {{xs:6, sm:4, md:2}} key = {track.id} >
                            <Card
                                name= {track.name}
                                artistName = {track.artists?.map((a) => a.name).join(", ")}
                                image = {track.album?.images?.[0]?.url}
                            />
                            
                        </Grid>

                    ))}
                </Grid>
             ): (
                <Typography variant="h2"> No data</Typography>
            )} 

        </div>


    );
};


export default Tracks;



