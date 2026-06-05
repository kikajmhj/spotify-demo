import { A } from "react-router/dist/development/data-BqZ2x964";
import { SimplifiedAlbum } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { Show, SimplifiedAudioBook, SimplifiedEpisode, Track } from "./track";
import { SimplifiedPlaylist } from "./playlist";

export const enum SEARCH_TYPE {
    Track= "track",
    Album= "album",
    Playlist= "playlist",
    Show= "show",
    Episode= "episode",
    AudioBook= "audiobook",
    Artist= "artist",
}
export interface SearchRequestParams {
    q: string;
    type: SEARCH_TYPE[];
    market?:string;
    limit?:number;
    offset?:number;
    include_external?:string;

}

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbum>;
    tracks?: ApiResponse<Track>;
    playlist?: ApiResponse<SimplifiedPlaylist>;
    shows?: ApiResponse<Show>;
    episodes?: ApiResponse<SimplifiedEpisode>
    audiobook?: ApiResponse<SimplifiedAudioBook>


}