import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingSpinner from "../../../Common/components/LoadingSpinner";
import ErrorMessage from "../../../Common/components/ErrorMessage";
import { Typography, Grid } from "@mui/material";
import Card from "../../../Common/components/Card";

const NewReleases = () => {
  const { data, isLoading, error } = useGetNewReleases();

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" sx={{ paddingTop: "8px" }}>
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid size={{ xs: 6, sm: 4, md: 2 }} key={album.id}>
              <Card
                name={album.name}
                artistName={album.artists
                  .map((artist) => artist.name)
                  .join(", ")}
                image={album.images[0].url}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h2">No data</Typography>
      )}
    </div>
  );
};

export default NewReleases;