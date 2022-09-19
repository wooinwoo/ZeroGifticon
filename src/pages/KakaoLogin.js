import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL, getToken } from "../api";
import Loading from "../components/Loading";
import { setAccessToken, setRefreshToken } from "../token";

function KakaoLogin() {
  const navigate = useNavigate();

  let response = null;
  const getKakaoToken = async () => {
    let code = new URL(window.location.href).searchParams.get("code");
    try {
      response = await getToken(`${BASE_URL}/auth/login/kakao?code=${code}`);
    } catch (error) {
      console.log(error);
      alert("로그인에 실패하였습니다.");
      navigate("/login");
    }
    if (response.status === 200) {
      setAccessToken(response.accessToken);
      setRefreshToken(response.refreshToken);
      navigate("/shop");
    }
  };

  useEffect(() => {
    getKakaoToken();
  }, []);

  return (
    <div>
      <Loading />
    </div>
  );
}

export default KakaoLogin;
