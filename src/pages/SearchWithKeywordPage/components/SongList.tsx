import { Typography, Box, styled } from "@mui/material";
import { flexGrow, minWidth } from "@mui/system";
import { Track } from '../../../models/track';


const formatDuration = (ms?: number) => {
    if (!ms) return '';
    const min = Math.floor (ms /60000);
    const sec = Math.floor ((ms % 60000) /1000).toString().padStart (2, '0');
    return `${min}:${sec}`;
};

const Row = styled (Box) (({theme}) => ({

    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer',
    '&:hover': {backgroundColor: theme.palette.action.hover},

}));

const Thumb = styled ('img') ({
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    objectFit: 'cover'
});

const SongList = ({tracks}: {tracks: Track[]}) => {

    return (
        <Box>
            {tracks.map ((track) => (

                <Row key = {track.id}>   

                    <Thumb src = {track.album?.images?.[0]?.url} alt={track.name} />

                    <Box sx = {{flexGrow:1, minWidth: 0}} >
                        <Typography variant="body1" noWrap sx = {{color:'#fff'}}>
                            {track.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {track.artists?.map((a) => a.name).join (', ')}
                        </Typography>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {formatDuration (track.duration_ms)}
                    </Typography>
                </Row>
            
            ))}
      

        </Box>
    );
};

export default SongList;