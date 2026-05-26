import { useParams } from 'react-router';

const PlaylistDetailPage = () => {
  const { id } = useParams();

  return (
    <div>Playlist Detail Page: {id}</div>
  );
};

export default PlaylistDetailPage;
