import { Typography, Box, styled } from "@mui/material";
import { Track } from '../../../models/track';
import PlayButton from '../../../Common/components/PlayButton';

const Container = styled (Box)(({ theme}) => ({
    position: 'relative',
    backgroundColor: theme.palette.action.hover,
    borderRadius: '8px',
    padding: '20px',
    minHeight: '280px',
    boxSizing: 'border-box',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {backgroundColor: '#282828'},
    '&:hover .overlay': {opacity:1 , transform: 'translateY(0)' }
 
}));

const AlbumImage = styled ('img') ( {
    width: '92px',
    height: '92px',
    borderRadius: '8px',
    marginBottom: '16px',
    objectFit: 'cover'
});

const Overlay = styled (Box) ( {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    opacity: 0,
    transform: 'translateY(8px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease'

});

const TopResult = ({track}: {track:Track}) =>  {
    return (
        <Container>
            <AlbumImage src={track.album?.images?.[0]?.url} alt = {track.name} />
            <Typography variant="h1" sx= {{ fontWeight:700, mb:1}} >
                {track.name || 'No name'} 
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Song • {track.artists?.[0]?.name || 'Unknown'}
            </Typography>
            <Overlay className="overlay">
                <PlayButton />
            </Overlay>
        </Container>

    );
};

export default TopResult;