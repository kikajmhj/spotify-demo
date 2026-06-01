import { useQuery } from "@tanstack/react-query";
import { getCurrentPlaylist } from "../apis/playlistApi";
import { GetCurrentPlaylistRequest } from "../models/playlist";


const useGetCurrentUserPlaylist = ({limit, offset}: GetCurrentPlaylistRequest) => {
    return useQuery({
        queryKey: ["current-user-playlist"],
        queryFn: () => {
            return getCurrentPlaylist({limit, offset});
        }  
    })
}    

export default useGetCurrentUserPlaylist;