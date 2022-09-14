import { useState } from "react";
import { Navigate } from "react-router-dom";
import Logo from "../images/heart.png";
import KaKaoLoginImg from "../images/kakao_login_large_wide.png";
import { KAKAO_AUTH_URL } from "../OAuth";
import styles from "./pageStyles/Login.module.css";

function Login() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  const loginServer = "https://zerogift.p-e.kr:443/auth/login";

  const handleLogin = async (e) => {
    e.prevent.default();

    const response = await fetch(`${loginServer}`, {
      method: "POST",
      body: { id: id, password: pw },
    });
    const result = await response.json();

    if (result.ok) {
      localStorage.setItem("refresh-token", result["refresh_token"]);
      Navigate("/shop");
      // refresh 토큰은 local starage에 저장
      // access token은 cookie에 저장
      // 요청 헤더에 access token을 넣어라??
      // access token이 만료됐다고 하면,
      // refresh token을 가져와 새로운 token 요청 후 갱신
      // 로그인 성공 -> 데이터.. switch..
    }
  };

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.title}>
        <div className={styles.logo}>Zero-gift</div>
        <div>
          . 마음을 선물해요
          <img className={styles.logoImg} src={Logo} alt="로고" />
        </div>
      </div>
      <div></div>
      <form className={styles.loginForm}>
        <div className={styles.login}>로그인</div>
        <input
          className={styles.input}
          onChange={handleId}
          placeholder="아이디 또는 이메일 주소"
        ></input>
        <input
          className={styles.input}
          type="password"
          onChange={handlePw}
          placeholder="비밀번호"
        ></input>
        <button
          className={styles.loginButton}
          type="submit"
          onClick={handleLogin}
        >
          이메일 로그인
        </button>
      </form>
      <div className={styles.lineForm}>
        <div className={styles.line} />
        <div className={styles.lineText}>Or Social Login</div>
        <div className={styles.line} />
      </div>
      <button className={styles.kakaoButton} onClick={handleKakaoLogin}>
        <img src={KaKaoLoginImg} alt="카카오 로그인" />
      </button>
    </div>
  );
}

export default Login;
