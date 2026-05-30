import axios from "axios";

import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

import type { GetNewReleasesResponse } from "../models/album";

export const getNewReleases = async (
  clientCredentialToken: string,
): Promise<GetNewReleasesResponse> => {
  try {
    // /browse/new-releases는 개발 모드 앱에서 403으로 막혀 있어,
    // 제한 없는 /search 엔드포인트로 2026년 발매 앨범을 가져온다. (응답 구조 동일: albums.items)
    const response = await axios.get(
      `${SPOTIFY_BASE_URL}/search?q=year%3A2026&type=album&limit=6`,
      {
        headers: {
          Authorization: `Bearer ${clientCredentialToken}`,
        },
      },
    );
    console.log("response:", response.data);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
      console.log(error.response?.status);
      console.log(error.response?.data);
    }

    throw error;
  }
};