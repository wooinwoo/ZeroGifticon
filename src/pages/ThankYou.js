import styles from "./pageStyles/ThankYou.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function ThankForm() {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.thankForm} onSubmit={handleSubmit}>
      <textarea
        className={styles.content}
        type="textarea"
        value={content}
        onChange={handleChange}
      />
      <button className={styles.button} type="submit">
        감사 메세지 보내기
      </button>
    </form>
  );
}

function ThankYou() {
  const location = useLocation();
  const item = location.state?.item;

  return (
    <div className={styles.thank}>
      <div className={styles.title}>감사의 마음을 전해요</div>
      <div className={styles.to}>to. {item.send_member}</div>
      <ThankForm />
    </div>
  );
}

export default ThankYou;
