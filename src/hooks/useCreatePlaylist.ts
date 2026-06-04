import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createPlaylist } from "../apis/playlistApi"
import useGetCurrentUserProfile from "./useGetCurrentUserProfile"
import { CreatePlaylistRequest } from "../models/playlist"



const useCreatePlaylist = () => {

    const queryClient = useQueryClient();

    const {data:user} = useGetCurrentUserProfile()


    return useMutation ({
        mutationFn: (params: CreatePlaylistRequest) => {
            if (user) {
            return createPlaylist(user.id, params)
            } 
            return Promise.reject(new Error("User not definedd"));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["current-user-playlist"] });
            console.log ("성공")

        }
    });

}

export default useCreatePlaylist;