import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../images/heart.png";
import KaKaoLoginImg from "../images/kakao_login_large_wide.png";
import { KAKAO_AUTH_URL } from "../OAuth";
import { cookie } from "../token";
import styles from "./pageStyles/Login.module.css";

function Login() {
  const navigate = useNavigate();
  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  const haveToken = () => {
    if (cookie.get("accessToken")) {
      navigate("/shop");
    }
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
