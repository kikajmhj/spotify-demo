import { Typography, Box, styled, IconButton, Menu, MenuItem, Snackbar } from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import { useState } from "react";
import { Track } from "../../../models/track";
import useGetCurrentUserPlaylist from "../../../hooks/useGetCurrentUserPlaylist";
import useAddItemToPlaylist from "../../../hooks/useAddItemToPlaylist";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";

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
    '& .add-btn': {
        opacity: 0,
        transition: 'opacity 0.15s ease',
    },
    '&:hover .add-btn': {
        opacity: 1,
    },
    


}));

const Thumb = styled ('img') ({
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    objectFit: 'cover'
});

const SongList = ({tracks}: {tracks: Track[]}) => {
    

    const [anchorEL, setAnchorEL] = useState <null| HTMLElement> (null);
    const [selectedTrack, setSelectedTrack] = useState <Track | null> (null);
    const [snackbar, setSnackbar] = useState <string>("");

    const { data: user } = useGetCurrentUserProfile();

    const {data, fetchNextPage, hasNextPage} = useGetCurrentUserPlaylist({limit: 25, offset: 0});
    const playlists = data?.pages.flatMap((p) => p.items) ?? [];

    const {mutate: addItem} = useAddItemToPlaylist();

    const openMenu = (e: React.MouseEvent<HTMLElement>, track:Track) => {
       e.stopPropagation();
       setSelectedTrack(track);
       setAnchorEL (e.currentTarget);
    }

    const handleSelectPlaylist = (playlistId:string, playlistName:string) => {

        if (!selectedTrack?.uri) return;
        addItem (
            {playlist_id: playlistId, uris: [selectedTrack.uri]},
            {onSuccess: ()=> setSnackbar(`${playlistName}에 추가 되었습니다.`)}
        );
        setAnchorEL(null);


    }



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

                    {user && (
                        <IconButton className="add-btn" size="small"
                            onClick= {(e) => openMenu(e,track)} sx = {{color:"text.secondary"}} >
                            <AddCircleOutlinedIcon />
                        </IconButton>
                    )}


                    <Typography variant="body2" color="text.secondary">
                        {formatDuration (track.duration_ms)}
                    </Typography>
                </Row>
            
            ))}

            <Menu
                anchorEl = {anchorEL}
                open= {Boolean(anchorEL)}
                onClose= {()=> setAnchorEL(null)}
                slotProps = {{paper: {sx: {maxHeight:300, width:240, bgcolor: "#282828", color: "#fff" } } }}
            >
                {playlists.map( (pl) => (
                    <MenuItem key= {pl.id} onClick= {() => handleSelectPlaylist(pl.id!, pl.name!)}>
                        {pl.name}
                    </MenuItem>
                ))}

                {hasNextPage && (
                    <MenuItem onClick= {() => fetchNextPage()} sx= {{color: "text.secondary"}}>
                        더 보기...
                    </MenuItem>
                )}
            </Menu>

            <Snackbar
               open= {Boolean(snackbar)}
               autoHideDuration = {3000}
               onClose = {() => setSnackbar("")}
               message = {snackbar}
               anchorOrigin = {{vertical:"bottom", horizontal: "center"}}
            />
  

        </Box>
    );
};

export default SongList;