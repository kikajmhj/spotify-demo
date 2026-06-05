import { useInfiniteQuery } from "@tanstack/react-query"
import { searchItemsByKeyword } from "../apis/searchApi";
import { SearchRequestParams } from "../models/search";
import useClientCredentialToken from "./useClientCredentialToken";



const useSearchItemsByKeyword = (params: SearchRequestParams) => {

    const clientCredentialToken = useClientCredentialToken();

    return useInfiniteQuery ({
        queryKey:["search", params],
        queryFn: ({pageParam = 0}) => {
            if (!clientCredentialToken) throw new Error("no token available");
            return searchItemsByKeyword(clientCredentialToken,  {
                ...params,
                offset: pageParam,
        });
        },
        initialPageParam: 0,
        // 검색어와 토큰이 모두 있을 때만 요청 (빈 q로 400 나는 것 방지)
        enabled: !!params.q && !!clientCredentialToken,
        getNextPageParam: (lastPage) => {
            const nextPageUrl = 
                lastPage.tracks?.next ||
                lastPage.artists?.next ||
                lastPage.albums?.next ||
                lastPage.playlist?.next ||
                lastPage.shows?.next ||
                lastPage.episodes?.next ||
                lastPage.audiobook?.next

            if (nextPageUrl) {
                const nextOffset = new URL (nextPageUrl).searchParams.get("offset")
                return nextOffset?parseInt(nextOffset):undefined
            }

            return undefined;

        }
    })
}

export default useSearchItemsByKeyword;