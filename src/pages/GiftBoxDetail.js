import { useEffect, useState } from "react";
import styles from "./pageStyles/GiftBoxDetail.module.css";
import { useParams } from "react-router-dom";
import { getData, BASE_URL } from "../api";
import Barcode from "react-barcode/lib/react-barcode";
import { cookie } from "../token";

function GiftBoxDetail() {
  const { giftId } = useParams();
  const [item, setItem] = useState({});

  console.log(giftId);

  const handleLoad = async () => {
    const gifts = await getData(
      `${BASE_URL}/${giftId}`,
      cookie.get("accessToken")
    );
    setItem(gifts);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  console.log(item);

  return (
    <div className={styles.detail}>
      <img className={styles.itemImg} src={item.img} alt={item.title}></img>
      <div className={styles.title}>{item.title}</div>
      <Barcode value="example" className={styles.barcode}>
        바코드
      </Barcode>
      <div className={styles.use}>사용기한</div>
      <button className={styles.button}>감사 메세지 보내기</button>
    </div>
  );
}

export default GiftBoxDetail;
