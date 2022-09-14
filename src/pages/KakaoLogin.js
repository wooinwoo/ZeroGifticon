import { useNavigate } from "react-router-dom";

function KakaoLogin() {
  const navigate = useNavigate();

  const loginServer = "https://zerogift.p-e.kr:443/auth/login";
  const getKakaoToken = async () => {
    let code = new URL(window.location.href).searchParams.get("code");

    const response = await fetch(`${loginServer}`, {
      method: "POST",
      body: {
        provider: "Kakao",
        code: code,
      },
    });
    const data = await response.json();
    if (data.access_token) {
      const ACCESS_TOKEN = data.access_token;
      // navigate("/shop");
    } else {
      // navigate("/login");
    }
  };

  getKakaoToken();

  return (
    <div>
      <div>로그인 중입니다. 잠시만 기다려 주세요.</div>
    </div>
  );
}

export default KakaoLogin;
