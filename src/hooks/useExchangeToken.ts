
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exchangeToken } from "../apis/authApi";
import { ExchangeTokenResponse } from "../models/auth";
import { setTokens } from "../utils/tokenStorage";

const useExchangeToken = () => {

    const queryClient = useQueryClient();

    return useMutation<ExchangeTokenResponse, Error, { code: string; codeVerifier: string }>({
        mutationFn: ({ code, codeVerifier }) => exchangeToken(code, codeVerifier),
        onSuccess: (data) => {
            // access_token / refresh_token / expires_at 저장 + spotify-token-changed 이벤트 발생
            // (useAccessToken 구독자가 갱신을 받도록)
            setTokens(data.access_token, data.refresh_token, data.expires_in);

            console.log("useExchangeToken:", data.scope);

            // 토큰이 없던 동안 401로 실패한 쿼리들(프로필/플레이리스트)을 재요청시킨다
            queryClient.invalidateQueries();
        }
    })
};

export default useExchangeToken;