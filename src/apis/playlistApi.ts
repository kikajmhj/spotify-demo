import { GetCurrentPlaylistRequest, GetCurrentPlaylistResponse } from "../models/playlist";
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
