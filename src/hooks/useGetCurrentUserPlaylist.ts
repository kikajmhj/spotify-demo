import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult, useQuery } from "@tanstack/react-query";
import { getCurrentPlaylist } from "../apis/playlistApi";
import { GetCurrentPlaylistRequest, GetCurrentPlaylistResponse } from "../models/playlist";


const useGetCurrentUserPlaylist = ({limit, offset}: GetCurrentPlaylistRequest):
UseInfiniteQueryResult<InfiniteData<GetCurrentPlaylistResponse, unknown>, Error> => {
    return useInfiniteQuery({
        queryKey: ["current-user-playlist"],
        queryFn: ({ pageParam = 0 }) => {
            return getCurrentPlaylist({ limit, offset: pageParam });
        },
        initialPageParam: 0,  
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get("offset");
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
           }
    })
}    

export default useGetCurrentUserPlaylist;