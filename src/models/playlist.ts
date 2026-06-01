import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Owner } from "./commonType";
import { Image } from "./commonType";


export interface GetCurrentPlaylistRequest {
    limit?: number;
    offset?: number;
}


export type GetCurrentPlaylistResponse = ApiResponse<SimplifiedPlaylist>;


// 사이드바 등에서 쓰는 플레이리스트 표시용 타입 (현재 API 응답과 동일 구조)
export type IPlaylist = SimplifiedPlaylist;


export interface SimplifiedPlaylist {
    collaborative?: boolean;
    description?: string | null;
    external_urls?: ExternalUrls;
    href?: string;
    id?: string;
    images?: Image[]; 
    name?: string;
    owner:Owner;
    public?: boolean | null;
    snapshot_id?: string;
    tracks: {
        href: string;
        total: number;
    };
    type?: string;
    uri?: string;
}