import { useEffect, useState } from "react";
import { handleData } from "../api";
import { Link } from "react-router-dom";
import styles from "./pageStyles/GiftBox.module.css";

function ReviewListItem({ item }) {
  return (
    <>
      <div>
        <Link to={`/mypage/reivew/${item.id}`} state={{ item: item }}>
          <div>메세지 내용</div>
        </Link>
      </div>
    </>
  );
}

function ReviewList({ items }) {
  if (items.length === 0)
    return <div className={styles.noItem}>작성한 리뷰가 없습니다.</div>;
  return (
    <ul className={styles.items}>
      {items.map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            <ReviewListItem key={item.id} item={item} />
          </li>
        );
      })}
    </ul>
  );
}

function MyReview() {
  const [items, setItems] = useState([]);
  const handleLoad = async () => {
    const reviews = await handleData.getData("/review/user");
    setItems(reviews.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div>
      <ReviewList items={items} />
    </div>
  );
}

export default MyReview;
