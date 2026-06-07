import { Navigate, useParams } from 'react-router';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import styled from '@emotion/styled';
import { Grid, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TableContainer } from '@mui/material';
import DefaultImage from '../../Common/components/DefaultImage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import LoadingSpinner from '../../Common/components/LoadingSpinner';
import ErrorMessage from '../../Common/components/ErrorMessage';
import LoginRequired from '../../Common/components/LoginRequired';
import useAccessToken from '../../hooks/useAccessToken';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';

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

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  height: "calc(100% - 64px)",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));




const PlaylistDetailPage = () => {

  const { id } = useParams<{ id: string }>();

  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist} = useGetPlaylist({ playlist_id: id });

  console.log('ddd, playlist detail: ', playlist);
  
  
  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error: playlistItemsError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  const accessToken = useAccessToken();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);


  console.log('ddd, playlist items: ', playlistItems);

  // 응답 필드명이 tracks -> items 로 바뀌었고, 각 항목도 track 또는 item 으로 올 수 있어 양쪽 모두 대응
  const tracks =
    playlistItems?.pages.flatMap((page) => page.items ?? []) ?? [];


  // 토큰이 없거나(로그아웃) 401 이면 로그인 화면을 보여준다
  if (!accessToken || playlistItemsError?.status === 401) {
    return <LoginRequired />;
  }

  // 그 외 진짜 로드 실패라면 fail to load
  if (playlistItemsError) {
    return <ErrorMessage errorMessage="Failed to load" />;
  }


  return (
    <StyledTableContainer>
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
              sx={{ ml: 1, fontWeight: 700 }}
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
    {playlist?.items?.total === 0 ? (
      <EmptyPlaylistWithSearch playlist_id={id}/>
    ) : (
       <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Album</TableCell>
            <TableCell>Date added</TableCell>
            <TableCell>Duration</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {playlistItems?.pages.map((page, pageIndex) => page.items.map((item, itemIndex) => {
            return <DesktopPlaylistItem 
               item={item} 
               key={itemIndex} 
               index={pageIndex * PAGE_LIMIT + itemIndex + 1} 
               />;
          }))}
          <TableRow sx={{ height: "5px" }} ref={ref} />
            {isFetchingNextPage && <LoadingSpinner />}

        </TableBody>
       </Table>
    )}

    </StyledTableContainer>
  );
};

export default PlaylistDetailPage;
