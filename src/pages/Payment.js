import styles from "./pageStyles/Payment.module.css";

import axios from "axios";
import { useState } from "react";
import { useLocation, Link } from "react-router-dom";

export default function Payment() {
  const data = useLocation().state;
  console.log(data);
  const [productState, setProductState] = useState({
    img: data.img,
    title: data.title,
    body: data.body,
    price: data.price,
    description: "",
  });

  const post_data = () => {
    axios.post("1", { ...productState }).then(function (response) {
      console.log(response); //성공
    });
  };

  return (
    <div className={styles.Container}>
      <div className={styles.editArea}>
        <h1 className={styles.mainName}>결제창</h1>
        <div className={styles.titleArea}>
          <img href={data.img} alt="" className={styles.img} />
          <div>
            <p className={styles.title}>{data.name}</p>
            <p className={styles.body}>{data.description}</p>
          </div>
        </div>

        <div className={styles.infoArea}>
          <span className={styles.name}>결제금액</span>
          <span className={styles.price}>{data.price}원</span>
        </div>
        <div className={styles.infoArea}>
          <span className={styles.name}>포인트</span>
          <span className={styles.point}>보유 1,000P</span>
        </div>

        <div className={styles.infoArea}>
          <input
            className={styles.pInput}
            placeholder="가격"
            onChange={(e) =>
              setProductState({ ...productState, price: e.target.value })
            }
          />
          <button className={styles.pointBtn}>전액사용</button>
        </div>
        <div className={styles.userName}>{data.nickname}</div>
        <input
          className={styles.sInput}
          placeholder="고마워 친구야 ...."
          onChange={(e) =>
            setProductState({ ...productState, description: e.target.value })
          }
        />
        <Link to={"/shop"} className={styles.sendBtn} onClick={post_data}>
          선물 보내기
        </Link>
      </div>
    </div>
  );
}
