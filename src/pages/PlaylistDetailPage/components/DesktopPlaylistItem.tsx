
import React from 'react';
import dayjs from 'dayjs';


import { PlaylistTrack } from '../../../models/playlist';
import { Episode, Track } from '../../../models/track';
import { styled, Table, TableCell, TableRow } from '@mui/material';


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));



interface DesktopPlaylistItemProps {
    
    index: number;
    item: PlaylistTrack;
}

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {

    const isEpisode = (track: Track | Episode): track is Episode => {
        return "description" in track;
    };

  

    return (
        <StyledTableRow>
            <TableCell>{index}</TableCell>
            <TableCell>{item.item.name || "no name"}</TableCell>
            <TableCell>
                {isEpisode(item.item)
                    ? "N/A" : item.item.album?.name }
            </TableCell>
            <TableCell>{dayjs(item.added_at).format('YYYY-MM-DD') || "Unknown"}</TableCell>
            <TableCell>{item.item.duration_ms ? `${Math.floor(item.item.duration_ms / 60000)}:${Math.floor((item.item.duration_ms % 60000) / 1000).toString().padStart(2, '0')}` : "Unknown"}</TableCell> 

        </StyledTableRow>

    );
};

export default DesktopPlaylistItem;    