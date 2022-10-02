import styles from "./pageStyles/Payment.module.css";

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { handleData } from "../api";

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
  const [item, setItem] = useState([]);

  useEffect(() => {
    const response = handleData.getData("/member-search/member");
    setItem(response.data);
  }, []);

  const post_data = () => {
    console.log(1);
    handleData
      .createData("/pay", {
        impUid: "아임포트 아이디값",
        merchantUid: "상점 아이디 값",
        message: productState.description,
        pgProvider: "PG 아이디 값",
        pgTid: "PG 거래번호",
        productId: data.id,
        sendId: 0,
        usePoint: 0,
      })
      .then((res) => {
        console.log(res);
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
          {/* <span className={styles.point}>보유 {item.point}P</span> */}
          <span className={styles.point}>보유 1000P</span>
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
        <textarea
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
