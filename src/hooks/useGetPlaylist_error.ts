import {useQuery} from "@tanstack/react-query";
import { GetPlaylistRequest, Playlist, SpotifyError } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (params: GetPlaylistRequest) => {

    return useQuery<Playlist, SpotifyError>({
        queryKey: ['playlist-detail', params.playlist_id],
        queryFn: async () => {
            return getPlaylist(params);
        },
        enabled: !!params.playlist_id, // playlist_id가 있을 때만 쿼리 실행
    })

}

export default useGetPlaylist;