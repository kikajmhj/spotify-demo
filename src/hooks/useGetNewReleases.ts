import { useQuery } from "@tanstack/react-query";
import { getNewReleases } from "../apis/albumApi";
import useAccessToken from "./useAccessToken";

const useGetNewReleases = () => {
  const accessToken = useAccessToken();

  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!accessToken) throw new Error("Access token is not available");
      return getNewReleases(accessToken);
    },
    enabled: !!accessToken,
  });
};

export default useGetNewReleases;
