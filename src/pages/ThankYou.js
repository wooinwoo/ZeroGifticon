import styles from "./pageStyles/ThankYou.module.css";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { handleData } from "../api";

function ThankForm({ item }) {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [form, setForm] = useState({});
  const [sendName, setSendName] = useState("");

  const getMessage = async () => {
    const result = await handleData.getData(
      `/giftMessage/${item.giftMessageId}`
    );
    if (!result) {
      alert("메세지 조회에 실패했습니다.");
      return;
    }
    console.log(result);
    setForm(result.data);
    setSendName(result.data.sendName);
    setContent(result.data.message);
  };

  const getMessageForm = async () => {
    const result = await handleData.getData(`/giftMessage/form/${item.id}`);
    console.log(result.data);
    setForm(result.data);
    setSendName(result.data.sendMemberName);
  };

  const handleLoad = async () => {
    if (item.answer) {
      await getMessage();
    } else {
      await getMessageForm();
    }
  };

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      giftBoxId: item.id,
      message: content,
    };
    console.log(data);
    const result = await handleData.createData("/giftMessage", data);
    if (!result) {
      alert("메세지 전송에 실패했습니다.");
      return;
    }
    if (result) navigate("/gift-box");
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <img src={form.productImage} alt="productImage" />
      <div className={styles.to}>{`to. ${sendName}`}</div>
      <form className={styles.thankForm} onSubmit={handleSubmit}>
        <textarea
          className={styles.content}
          type="textarea"
          name="content"
          disabled={item.answer}
          value={content}
          onChange={handleChange}
        />
        {item.answer || (
          <button className={styles.button} type="submit">
            감사 메세지 보내기
          </button>
        )}
        {item.answer && (
          <Link to="/gift-box">
            <button className={styles.button} type="submit">
              선물함으로 돌아가기
            </button>
          </Link>
        )}
      </form>
    </>
  );
}

function ThankYou() {
  const location = useLocation();
  const item = location.state?.item;

  return (
    <div className={styles.thank}>
      <div className={styles.title}>감사의 마음을 전해요</div>
      <ThankForm item={item} />
    </div>
  );
}

export default ThankYou;
