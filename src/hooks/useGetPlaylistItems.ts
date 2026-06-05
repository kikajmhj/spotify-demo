import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { getPlaylistItems } from "../apis/playlistApi";
import { ApiError, GetPlaylistItemsRequest, GetPlaylistItemsResponse } from "../models/playlist";


const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {

    return useInfiniteQuery<
        GetPlaylistItemsResponse,
        ApiError,
        InfiniteData<GetPlaylistItemsResponse>,
        (string | GetPlaylistItemsRequest)[],
        number
    >({
        queryKey: ['playlist-items', params],
        queryFn: async ({ pageParam }) => {
            return getPlaylistItems({offset: pageParam, ...params});
        },
        // 토큰이 준비되기 전에 요청이 나가 401을 받는 race condition 방지
        enabled: !!params.playlist_id && !!localStorage.getItem('access_token'),
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        },
    });
};

export default useGetPlaylistItems;