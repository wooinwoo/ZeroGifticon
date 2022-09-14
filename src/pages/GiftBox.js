import { useEffect, useState } from "react";
import { getData, TEMP_URL } from "../api";
import { Link } from "react-router-dom";
import styles from "./pageStyles/GiftBox.module.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth()}. ${date.getDate()}`;
}

function GiftListItem({ item }) {
  return (
    <>
      <Link to={`/gift-box/gift-box-detail/${item.id}`}>
        <img src={item.img} alt={item.product_id} className={styles.giftImg} />
      </Link>
      <div className={styles.giftInfo}>
        <h1 className={styles.itemTitle}>{item.title}</h1>
        <p className={styles.p}>보낸사람: {item.send_member}</p>
        <p className={styles.p}>유효기간: {formatDate(item.expired_date)}</p>
        <p className={styles.p}>
          사용여부: {item.use} 감사표시: {item.answer}
        </p>
        <div className={styles.btns}>
          <Link to="/review" state={{ item: item }}>
            <button className={styles.reviewBtn}>리뷰 작성</button>
          </Link>
          <Link to="/thank" state={{ item: item }}>
            <button className={styles.thankBtn}>감사 메세지 보내기</button>
          </Link>
        </div>
      </div>
    </>
  );
}

function GiftList({ items }) {
  if (items.length === 0)
    return <div className={styles.noItem}>선물함이 비어 있습니다.</div>;
  return (
    <ul className={styles.items}>
      {items.map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            <GiftListItem key={item.id} item={item} />
          </li>
        );
      })}
    </ul>
  );
}

function GiftBox() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const gifts = await getData(TEMP_URL);
    setItems(gifts);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <GiftList items={items} />
    </>
  );
}

export default GiftBox;
