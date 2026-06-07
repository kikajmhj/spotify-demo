import axios from "axios";
import { CreatePlaylistRequest, GetCurrentPlaylistRequest, GetCurrentPlaylistResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, Playlist } from "../models/playlist";
import api from "../utils/api";


export const getCurrentPlaylist = async (
    { limit, offset }: GetCurrentPlaylistRequest) : Promise<GetCurrentPlaylistResponse> => {
    try {
        const response = await api.get(`/me/playlists`, {
            params: {
                limit,
                offset
            }
        });

        console.log("ddd: getCurrentPlaylist response", response);
        return response.data;

    } catch (error) {
        console.error("Failed to get current playlist", error);

        throw error;
    }
}

export const getPlaylist = async (params: GetPlaylistRequest) : Promise<Playlist> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params,
        });
        return response.data;
   }   catch (error) {

        if (axios.isAxiosError(error) && error.response?.data) {
            throw error.response.data;   // { error: { status, message } }
        }

        throw new Error("Failed to get playlist detail");
   }
}

export const getPlaylistItems = async (
    params: GetPlaylistItemsRequest
    ): Promise<GetPlaylistItemsResponse> => {
    try {
        const { playlist_id, ...query } = params;
        const response = await api.get(`/playlists/${playlist_id}/items`, {
            params: query,
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw {
                status: error.response?.status,
                message: error.response?.data?.error?.message ?? "Failed to get playlist items",
            };
        }
        throw new Error("Failed to get playlist items");
    }
}

export const createPlaylist = async (
    user_id:string, params: CreatePlaylistRequest
): Promise<Playlist> => {

        const {name, playlistPublic, collaborative, description} = params;

        try {
            //const response = await api.post(`/users/${user_id}/playlists`, {
            const response = await api.post(`/me/playlists`, {
                name,
                public: playlistPublic,
                collaborative,
                description
            });
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error(
                    "createPlaylist failed:",
                    error.response?.status,
                    error.response?.data,
                    "url:", error.config?.url
                );
            } else {
                console.error("createPlaylist failed:", error);
            }
            throw new Error("Failed to create playlist");
        }


}


export const addItemsToPlaylist = async (
    playlist_id: string,
    uris: string[]
): Promise< {snapshot_id: string}> => {

    try {
        const response = await api.post(`/playlists/${playlist_id}/items`, {uris})
        return response.data;

    } catch (error) {
       throw new Error("Failed to add item to playlist")
    }


}