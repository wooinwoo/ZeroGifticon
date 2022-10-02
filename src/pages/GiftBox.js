import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pageStyles/GiftBox.module.css";
import { handleData } from "../api";
import { useInView } from "react-intersection-observer";

function GiftListItem({ item }) {
  const className = item.use ? "used" : "";

  return (
    <>
      <Link className={className} to={`/gift-box/gift-box-detail/${item.id}`}>
        <img
          src={item.imageUrl}
          alt={item.productId}
          className={styles.giftImg}
        />
      </Link>
      <div className={styles.giftInfo}>
        <h1 className={styles.itemTitle}>{item.name}</h1>
        <p className={styles.p}>{item.description}</p>
        <p className={styles.p}>{item.sendNickname}</p>

        <div className={styles.btns}>
          <Link to="/gift-box/gift-review" state={{ item: item }}>
            <button disabled={item.review} className={styles.reviewBtn}>
              리뷰 작성
            </button>
          </Link>
          <Link to="/gift-box/gift-message" state={{ item: item }}>
            {item.answer && (
              <button type="button" className={styles.button}>
                보낸 메세지 조회
              </button>
            )}
            {item.answer || (
              <button type="button" className={styles.button}>
                감사 메세지 보내기
              </button>
            )}
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

  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView();

  const getItems = async () => {
    setLoading(true);
    setTimeout(() => {
      handleData.getData(`/giftbox?page=${page}&size=10`).then((res) => {
        setItems((items) => [...items, ...res.data]);
      });
    }, 100);
    setLoading(false);
  };
  useEffect(() => {
    if (inView && !loading) {
      setPage((page) => page + 1);
      getItems();
    }
  }, [inView, loading]);

  return (
    <>
      <GiftList items={items} />
      <div ref={ref}>{""}</div>
    </>
  );
}
export default GiftBox;
