import { useInfiniteQuery } from "@tanstack/react-query"
import { getPlaylistItems } from "../apis/playlistApi";
import { GetPlaylistItemsRequest } from "../models/playlist";


const useGetPlaylistItems = (params: GetPlaylistItemsRequest) => {

    return useInfiniteQuery ( {
        queryKey: ['playlist-items', params],
        queryFn: async ({ pageParam }) => { 
            return getPlaylistItems({offset: pageParam, ...params});
        },
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