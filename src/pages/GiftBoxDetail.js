import styles from "./pageStyles/GiftBoxDetail.module.css";
import { useEffect, useState } from "react";
import Barcode from "react-barcode";
import { Link, useParams } from "react-router-dom";
import { handleData } from "../api";

function GiftBoxDetail() {
  const { giftId } = useParams();
  const [item, setItem] = useState({});

  const handleLoad = async () => {
    const gifts = await handleData.getData(`/giftbox/${giftId}`);
    setItem(gifts.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.detail}>
      <img className={styles.itemImg} src={item.imageUrl} alt={item.name}></img>
      <div className={styles.title}>{item.name}</div>
      <Barcode value={item.barcodUrl} className={styles.barcode}>
        {item.name}
      </Barcode>
    </div>
  );
}
export default GiftBoxDetail;
