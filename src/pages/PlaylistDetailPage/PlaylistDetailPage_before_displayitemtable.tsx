import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import styled from '@emotion/styled';
import { Grid, Box, Typography } from '@mui/material';
import DefaultImage from '../../Common/components/DefaultImage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';

const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")({
  borderRadius: "8px",
  width: "100%",
  maxWidth: "280px",
  aspectRatio: "1 / 1",
  objectFit: "cover",
});
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));

const PlaylistDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist } = useGetPlaylist({ playlist_id: id });

  console.log('ddd, playlist detail: ', playlist);
  
  
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: 20});
  

  console.log('ddd, playlist items: ', playlistItems);

  // 응답 필드명이 tracks -> items 로 바뀌었고, 각 항목도 track 또는 item 으로 올 수 있어 양쪽 모두 대응
  const tracks =
    playlistItems?.pages.flatMap((page) => page.items ?? []) ?? [];

  return (
    <div>
    <PlaylistHeader container spacing={7}>
      <ImageGrid size={{ sm: 12, md: 3 }}>
        {playlist?.images ? (
          <AlbumImage
            src={playlist?.images[0].url}
            alt="playlist_cover.jpg"
          />
        ) : (
          <DefaultImage>
            <MusicNoteIcon fontSize="large" />
          </DefaultImage>
        )}
      </ImageGrid>
      <Grid size={{ sm: 12, md: 9 }}>
        <Box>
          <ResponsiveTypography variant="h1" color="white">
            {playlist?.name}
          </ResponsiveTypography>

          <Box display="flex" alignItems="center">
            <img
              src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
              width="20px"
              alt="owner_avatar"
            />
            <Typography
              variant="subtitle1"
              color="white"
              ml={1}
              fontWeight={700}
            >
              {playlist?.owner?.display_name
                ? playlist?.owner.display_name
                : 'unknown'}
            </Typography>
            <Typography variant="subtitle1" color="white">
              • {playlist?.items?.total ?? 0} songs
            </Typography>
          </Box>
        </Box>
      </Grid>
    </PlaylistHeader>

    <div style={{ padding: 16 }}>
      {isPlaylistItemsLoading ? (
        <p style={{ color: 'white' }}>Loading...</p>
      ) : playlistItemsError ? (
        <p style={{ color: 'red' }}>트랙을 불러오지 못했습니다.</p>
      ) : tracks.length === 0 ? (
        <p style={{ color: 'white' }}>이 플레이리스트에 곡이 없습니다.</p>
      ) : (
        tracks.map((entry, index) => {
          const item = entry.item;
          // item 은 Track | Episode 이므로 type 으로 좁혀서 부제목을 구함
          const subtitle =
            item.type === 'episode'
              ? item.show?.name
              : item.artists?.map((a) => a.name).join(', ');
          return (
            <div
              key={item.id ?? index}
              style={{ display: 'flex', alignItems: 'center', padding: '8px 0' }}
            >
              <span style={{ color: 'gray', width: 32 }}>{index + 1}</span>
              <div>
                <div style={{ color: 'white' }}>{item.name}</div>
                <div style={{ color: 'gray', fontSize: '0.875rem' }}>
                  {subtitle}
                </div>
              </div>
            </div>
          );
        })
      )}

      {hasNextPage && (
        <p
          style={{ color: 'gray', marginTop: 16, cursor: 'pointer' }}
          onClick={() => fetchNextPage()}
        >
          {isFetchingNextPage ? '불러오는 중...' : '더 보기'}
        </p>
      )}
    </div>
    </div>
  );
};

export default PlaylistDetailPage;
