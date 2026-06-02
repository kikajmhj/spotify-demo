import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, Owner } from "./commonType";
import { Image } from "./commonType";


export interface GetCurrentPlaylistRequest {
    limit?: number;
    offset?: number;
}


export type GetCurrentPlaylistResponse = ApiResponse<SimplifiedPlaylist>;


// 사이드바 등에서 쓰는 플레이리스트 표시용 타입 (현재 API 응답과 동일 구조)
export type IPlaylist = SimplifiedPlaylist;

export interface BasePlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;  
    images?: Image[];
    name?: string;
    owner:Owner;
    public?: boolean;
    snapshot_id?: string;
    type?: string;
    uri?: string;
}


export interface SimplifiedPlaylist extends BasePlaylist {

    tracks: {
        href: string;
        total: number;
    };
}

export interface Playlist extends BasePlaylist {
    tracks:ApiResponse<PlaylistTrack>;
    followers: {
        href: string | null;
        total: number;
    }
}

export interface PlaylistTrack {
    added_at?: string | null;
    added_by?: {
        external_urls?: ExternalUrls;
        followers?: Followers;
        href?: string;
        id?: string;
        type?: string;
    }
};

export interface GetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}