import { Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../../hooks/useGetNewReleases";


const NewRelease = () => {

  const {data, error, isLoading} = useGetNewReleases();
  console.log("ddd", data);

  return (
    <div> 
      <Typography variant="h1" sx={{ paddingTop: "8px" }}>
        New Released Albums
      </Typography>
    </div>
  );
}

export default NewRelease;