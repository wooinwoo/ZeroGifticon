import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pageStyles/Shop.module.css";

import ListItemLayout from "../components/ListItemLayout";
import ScrollWrapper from "../components/ScrollWrapper";
import { handleData } from "../api";

import viewIcon from "../images/view.svg";
import heartIcon from "../images/heart.svg";
import searchImg from "../images/search-icon.svg";

import birthday from "../images/birthday.png";
import food from "../images/food.png";
import giftcard from "../images/giftcard.png";
import cloth from "../images/cloth.png";
import cosmetic from "../images/cosmetic.png";
import delivery from "../images/delivery.png";
import health from "../images/health.png";
import luxury from "../images/luxury.png";
import other from "../images/other.png";

function Shop() {
  const [items, setItems] = useState([]);
  const [searchValue, setSerchValue] = useState("");

  const category = [
    { name: "생일", img: birthday, category: false, value: "BIRTHDAY" },
    { name: "식품", img: food, category: false, value: "FOOD" },
    { name: "배달", img: delivery, category: false, value: "DELIVERY" },
    { name: "기프트카드", img: giftcard, category: false, value: "GIFTCARD" },
    { name: "옷", img: cloth, category: false, value: "CLOTH" },
    { name: "화장품", img: cosmetic, category: false, value: "COSMETIC" },
    { name: "운동", img: health, category: false, value: "HEALTH" },
    { name: "럭셔리", img: luxury, category: false, value: "LUXURY" },
    { name: "기타", img: other, category: false, value: "OTHER" },
  ];

  const searchFilter = () => {
    console.log(searchValue);
    handleData
      .getData(`/product/search?q=${searchValue}&idx=0&size=500`)
      .then((res) => {
        console.log(res);
        setItems(() => [...res.data]);
      });
  };
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      searchFilter();
    }
  };
  console.log(items);
  return (
    <div className={styles.wrap}>
      <ScrollWrapper setItems={setItems}>
        <div className={styles.categoryArea}>
          <div className={styles.searchBox}>
            <input
              className={styles.searchFilter}
              placeholder="상품명 검색"
              onChange={(e) => setSerchValue(e.target.value)}
              onKeyPress={onCheckEnter}
            />
            <button className={styles.searchBtn} onClick={() => searchFilter()}>
              <img src={searchImg} alt="" className={styles.searchImg} />
            </button>
          </div>
          <div className={styles.categoryBtnWrap}>
            {category.map((data) => (
              <button className={styles.categoryBtn} key={data.img}>
                <img src={data.img} alt="" className={styles.img} />
                <div>{data.name}</div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.productArea}>
          {items.map((data) => (
            <Link to="/shop/shop-detail" state={{ data }}>
              <ListItemLayout
                imgSrc={data.mainImageUrl}
                title={data.name}
                key={data.id + data.name + new Date()}>
                <div className={styles.body}>{data.body}</div>
                <div className={styles.iconArea}>
                  <img src={viewIcon} alt="viewIcon" />
                  <span>{data.viewCount}</span>
                  <img src={heartIcon} alt="heartIcon" />
                  <span>{data.likeCount}</span>
                </div>
                <div className={styles.price}>{data.price} 원</div>
              </ListItemLayout>
            </Link>
          ))}
        </div>
      </ScrollWrapper>
    </div>
  );
}

export default Shop;
