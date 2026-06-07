import { useMutation, useQueryClient } from "@tanstack/react-query"
import { addItemsToPlaylist } from "../apis/playlistApi";
import useGetCurrentUserProfile from "./useGetCurrentUserProfile";


const useAddItemPlaylist = () => {
    const queryClient = useQueryClient();
    const {data:user} = useGetCurrentUserProfile()

    return useMutation ({
        mutationFn: ({ playlist_id, uris }: { playlist_id: string; uris: string[] })  => {
                        if (user) {
                            return addItemsToPlaylist (playlist_id, uris)
                        } 
                        return Promise.reject(new Error("User not definedd"));      
                    },
        onSuccess: (_, { playlist_id }) => {
            queryClient.invalidateQueries({ queryKey: ["playlist-detail"] });
            queryClient.invalidateQueries({ queryKey: ["playlist-items"] });
            queryClient.invalidateQueries({ queryKey: ["current-user-playlist"] });
            console.log("노래 추가 성공");
        },
    });

};

export default useAddItemPlaylist;