import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/heart.png";
import KaKaoLoginImg from "../images/kakao_login_large_wide.png";
import { KAKAO_AUTH_URL } from "../OAuth";
import styles from "./pageStyles/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const haveToken = () => {
    const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));
    if (accessToken) {
      const accessExpires = new Date(accessToken.expires.slice(0, -1));
      let now = new Date();
      if (accessExpires > now) {
        window.localStorage.removeItem("accessToken");
      }
    }

    if (accessToken) {
      navigate("/shop");
      return;
    }

    const refreshToken = JSON.parse(
      window.localStorage.getItem("refreshToken")
    );

    if (refreshToken) {
      const refreshExpires = new Date(refreshToken.expires.slice(0, -1));
      let now = new Date();
      if (refreshExpires > now) {
        window.localStorage.removeItem("refreshToken");
        return;
      }
    }

    navigate("/shop");
  };

  useEffect(() => {
    haveToken();
  }, []);

  return (
    <div className={styles.loginPage}>
      <div className={styles.title}>마음을 선물해요</div>
      <img className={styles.logoImg} src={Logo} alt="로고" />
      <button className={styles.kakaoButton} onClick={handleKakaoLogin}>
        <img src={KaKaoLoginImg} alt="카카오 로그인" />
      </button>
      <div className={styles.logo}>Zero-gift</div>
    </div>
  );
}

export default Login;
