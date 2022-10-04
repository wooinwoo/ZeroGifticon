import styles from "./pageStyles/Payment.module.css";

import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import { handleData } from "../api";

export default function Payment() {
  const data = useLocation().state;
  const [productState, setProductState] = useState({
    img: data.img,
    title: data.title,
    body: data.body,
    price: data.price,
    description: "",
  });
  const [point, setPoint] = useState(0);
  const [viewPoint, setViewPoint] = useState(0);
  const [sendUser, setSendUser] = useState([]);
  useEffect(() => {
    const res = handleData.getData("/member-search/member");
    res.then((val) => {
      setViewPoint(val.data.point);
      setSendUser(val.data);
    });
  }, []);

  const post_data = () => {
    const { IMP } = window;
    IMP.init("imp14806872");
    IMP.request_pay(
      {
        pg: "html5_inicis",
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: "주문명:결제테스트",
        amount: data.price - point,
        buyer_email: "iamport@siot.do",
        buyer_name: sendUser.nickname,
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "{}",
      },
      function (rsp) {
        if (rsp.success) {
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          msg += "카드 승인번호 : " + rsp.apply_num;
          payment(rsp);
        } else {
          var msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  };

  const payment = (pay) => {
    console.log(pay);
    handleData
      .createData("/pay", {
        impUid: pay.imp_uid,
        merchantUid: pay.merchant_uid,
        message: productState.description,
        pgProvider: pay.paid_at,
        pgTid: pay.pg_tid,
        productId: data.id,
        sendId: data.memberId,
        usePoint: point,
      })
      .then((res) => {
        console.log(res);
      });
  };
  const pointLock = (e) => {
    const val = data.price > viewPoint ? viewPoint : data.price;
    console.log(String(val), e.target.value);
    if (val < e.target.value) {
      setPoint(val);
    } else {
      setPoint(e.target.value);
    }
  };
  console.log(point);
  return (
    <div className={styles.Container}>
      <div className={styles.editArea}>
        <h1 className={styles.mainName}>결제창</h1>
        <div className={styles.titleArea}>
          <img src={data.images[0].url} alt="" className={styles.img} />
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
          <span className={styles.point}>보유 {viewPoint}P</span>
        </div>

        <div className={styles.infoArea}>
          <input
            className={styles.pInput}
            placeholder="사용 포인트"
            onChange={(e) => pointLock(e)}
            value={point}
          />
          <button
            className={styles.pointBtn}
            onClick={() =>
              setPoint(data.price > viewPoint ? viewPoint : data.price)
            }>
            전액사용
          </button>
        </div>
        <div className={styles.userName}>{data.nickname}</div>
        <textarea
          className={styles.sInput}
          placeholder="고마워 친구야 ...."
          onChange={(e) =>
            setProductState({ ...productState, description: e.target.value })
          }
        />
        <button to={"/shop"} className={styles.sendBtn} onClick={post_data}>
          선물 보내기
        </button>
      </div>
    </div>
  );
}
