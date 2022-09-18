import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pageStyles/Shop.module.css";

import ListItemLayout from "../components/ListItemLayout";
import viewIcon from "../images/view.svg";
import heartIcon from "../images/heart.svg";
import ScrollWrapper from "../components/ScrollWrapper";

import searchImg from "../images/search-icon.svg";
import food from "../images/food.png";
import beverage from "../images/beverage.png";
import giftcard from "../images/giftcard.png";
import cloth from "../images/cloth.png";
import cosmetic from "../images/cosmetic.png";
import health from "../images/health.png";
import luxury from "../images/luxury.png";
import other from "../images/other.png";

import { getData } from "../api";
function Shop() {
  const [items, setItems] = useState([]);
  const [searchValue, setSerchValue] = useState("");
  const category = [
    { name: "식품", img: food },
    { name: "음료", img: beverage },
    { name: "기프트카드", img: giftcard },
    { name: "옷", img: cloth },
    { name: "화장품", img: cosmetic },
    { name: "운동", img: health },
    { name: "럭셔리", img: luxury },
    { name: "기타", img: other },
  ];

  const searchFilter = () => {
    console.log("필터 기능 보내기");
  };
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      searchFilter();
    }
  };

  return (
    <div className={styles.wrap}>
      <ScrollWrapper setItems={setItems} url={"http://localhost:5000/memo"}>
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
          {category.map((data) => (
            <button className={styles.categoryBtn}>
              <img src={data.img} alt="" className={styles.img} />
              <div>{data.name}</div>
            </button>
          ))}
        </div>
        <div className={styles.productArea}>
          {items.map((data) => (
            <Link to="/shop/shop-detail" state={{ data }} key={data.id}>
              <ListItemLayout imgSrc={data.img} title={data.title}>
                <div className={styles.body}>{data.body}</div>
                <div className={styles.iconArea}>
                  <img src={viewIcon} alt="viewIcon" />
                  <span>{data.views}</span>
                  <img src={heartIcon} alt="heartIcon" />
                  <span>{data.heart}</span>
                </div>
              </ListItemLayout>
            </Link>
          ))}
        </div>
      </ScrollWrapper>
    </div>
  );
}

export default Shop;
