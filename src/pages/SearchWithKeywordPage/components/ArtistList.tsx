import { Box, Typography, styled } from '@mui/material';
import { Artist } from '../../../models/artist';
import PlayButton from '../../../Common/components/PlayButton';




const Scroller = styled (Box) ({
    display: 'flex',
    gap: '20px',
    overflowX: 'auto',
    paddingButton: '8px'
})

const Cell = styled (Box) (( {theme}) => ({
    position: 'relative',
    flex: '0 0 auto',
    padding: '16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {backgroundColor: theme.palette.action.hover},
    '&:hover .overlay': {opacity: 1, transform: 'translateY(0)'},

}));

const CircleImage = styled ('img') ({
    width: '128px',
    height: '128px',
    borderRadius: '50%',
    objectFit:'cover',
    marginBottom: '12px',
});

// 이미지가 없는 아티스트용 대체 원형 (이름 첫 글자 표시)
const CirclePlaceholder = styled (Box) ({
    width: '128px',
    height: '128px',
    borderRadius: '50%',
    marginBottom: '12px',
    backgroundColor: '#282828',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    fontWeight: 700,
    color: '#b3b3b3',
});

const Overlay = styled (Box) ({
    position: 'absolute',
    bottom: '70px',
    right: '20px',
    opacity: 0,
    transform: 'translateY(8px)',
    transition: 'opacity 0.3s ease, transform 0.3s ease'
});

const ArtistList = ({artists}: { artists: Artist[]}) => {

    return (
        <Scroller>
            {artists.map((artist) => (
                <Cell key = {artist.id}>
                    <Box sx = {{ position: 'relatvie'}} >
                        {artist.images?.[0]?.url ? (
                            <CircleImage src= {artist.images[0].url} alt= {artist.name} />
                        ) : (
                            <CirclePlaceholder>{artist.name?.[0] ?? '?'}</CirclePlaceholder>
                        )}
                        <Overlay className="overlay">
                            <PlayButton />
                        </Overlay>
                    </Box>
                
                    <Typography variant="h2" noWrap sx ={{color: '#fff'}} >
                        {artist.name}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                        Artist
                    </Typography>
                </Cell>
        
            ))}

        </Scroller>



    );
};

export default ArtistList;