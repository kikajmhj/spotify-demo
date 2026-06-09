import { Box, styled } from "@mui/material";
import { SimplifiedAlbum } from '../../../models/album';
import Card from '../../../Common/components/Card';



const Scroller = styled(Box)({
  display: 'flex',
  gap: '8px',
  overflowX: 'auto',
  paddingBottom: '8px',
});

const Cell = styled(Box)({
  flex: '0 0 auto',
  width: '180px',
});


const AlbumList = ({albums}: {albums: SimplifiedAlbum[]}) => {

        return (
            <Scroller>
                {albums.map((album) => (
                    <Cell key= {album.id}>
                        <Card
                         name= {album.name}
                         artistName = {album.artists?.[0]?.name}
                         image= {album.images?.[0].url}
                         />
                    </Cell>

                ))}


            </Scroller>

        );


};

export default AlbumList;