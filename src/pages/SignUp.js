import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleData } from "../api";
import styles from "./pageStyles/SignUp.module.css";

const INITIAL_VALUES = {
  email: "",
  nickname: "",
  password: "",
};

function SignUp() {
  const navigate = useNavigate();
  const [values, setValues] = useState(INITIAL_VALUES);

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    console.log(values);
    try {
      response = await handleData.getEmailToken(
        `/member-auth/register`,
        values
      );
      if (response.status === 200) {
        setValues(INITIAL_VALUES);
        alert("이메일 인증 후 로그인해 주세요");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setValues(INITIAL_VALUES);
      alert("회원가입에 실패하였습니다.");
    }
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.header}>
        <div className={styles.title}>ZeroGift</div>
        <div className={styles.des}>마음을 선물해요</div>
      </div>
      <form onSubmit={handleSubmit} className={styles.signupForm}>
        <div className={styles.subtitle}>
          <div>회원가입</div>
          <div onClick={handleClick} className={styles.login}>
            로그인
          </div>
        </div>
        <input
          className={styles.input}
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          placeholder="아이디 또는 이메일 주소"
        />
        <input
          className={styles.input}
          type="text"
          name="nickname"
          value={values.nickname}
          onChange={handleChange}
          placeholder="닉네임"
        />
        <input
          className={styles.input}
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          placeholder="비밀번호"
        />
        <button className={styles.loginButton} type="submit">
          회원 가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
