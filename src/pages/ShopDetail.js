import { useLocation, Link } from "react-router-dom";
import styles from "./pageStyles/ShopDetail.module.css";
import cx from "clsx";

import viewIcon from "../images/view.svg";
import heartIcon from "../images/heart.svg";
function ShopDetail() {
  const data = useLocation().state.data;
  const heart = () => {};
  return (
    <div className={styles.container}>
      <img src={data.img} className={styles.mainImg} alt="" />
      <div className={styles.info}>
        <span className={styles.title}>{data.title}</span>
        <span className={styles.price}>{data.price}원</span>
        <div className={styles.iconArea}>
          <img src={viewIcon} alt="viewIcon" />
          <span>{data.viewCount}</span>
          <img src={heartIcon} alt="heartIcon" />
          <span>{data.likeCount}</span>
        </div>
        <div className={styles.description}>{data.description}</div>
      </div>

      <div className={styles.btnArea}>
        <button
          className={cx(styles.heartBtn, styles.btn)}
          onClick={() => heart()}>
          ♡ 좋아요
        </button>
        <Link to="/shop/gift" state={data}>
          <button className={cx(styles.giftBtn, styles.btn)}>선물하기</button>
        </Link>
      </div>
    </div>
  );
}

export default ShopDetail;
