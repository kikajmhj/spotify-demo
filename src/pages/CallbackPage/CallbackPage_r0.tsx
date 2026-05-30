import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { exchangeCodeForToken } from "../../apis/authApi";

const CallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");

    if (error) {
      console.error("Spotify auth error:", error);
      navigate("/", { replace: true });
      return;
    }

    if (!code) {
      navigate("/", { replace: true });
      return;
    }

    exchangeCodeForToken(code)
      .catch((err) => console.error("Token exchange failed:", err))
      .finally(() => navigate("/", { replace: true }));
  }, [searchParams, navigate]);

  return <div>Logging in...</div>;
};

export default CallbackPage;
