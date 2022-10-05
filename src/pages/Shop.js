import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pageStyles/Shop.module.css";
import cx from "clsx";

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
  const [categoryBtn, setCategoryBtn] = useState("");
  var loading = false;
  const [page, setPage] = useState(0);
  var categoryList =
    "BIRTHDAY,CLOTH,COSMETIC,DELIVERY,FOOD,GIFTCARD,HEALTH,LUXURY,OTHER";

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

  const categoryFilter = (category) => {
    categoryList =
      "BIRTHDAY,CLOTH,COSMETIC,DELIVERY,FOOD,GIFTCARD,HEALTH,LUXURY,OTHER";
    loading = !loading;
    if (category === categoryBtn) {
      setCategoryBtn("");
    } else {
      categoryList = category;
      setCategoryBtn(category);
    }
    console.log(categoryList, page);
    handleData
      .getData(`/product/list?categories=${categoryList}&idx=${0}&size=10`)
      .then((res) => {
        setItems(res.data);
        setPage(1);
        loading = !loading;
      })
      .catch(() => {
        console.log("실패 !");
        alert("실패 !");
      });
  };

  const getItems = async () => {
    if (loading === true) {
      return;
    }
    if (categoryBtn !== "") {
      categoryList = categoryBtn;
    }
    setPage((page) => page + 1);
    loading = !loading;
    console.log(page);
    handleData
      .getData(`/product/list?categories=${categoryList}&idx=${page}&size=10`)
      .then((res) => {
        setItems((items) => [...items, ...res.data]);
        loading = !loading;
      });
  };
  console.log(items);
  return (
    <div className={styles.wrap}>
      <ScrollWrapper
        setItems={setItems}
        getItems={getItems}
        loading={loading}
        setPage={setPage}>
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
              <button
                className={styles.categoryBtn}
                key={data.img}
                onClick={() => categoryFilter(data.value)}>
                <div
                  className={cx(styles.box, {
                    [styles.categorySelected]: data.value === categoryBtn,
                  })}>
                  <img src={data.img} alt="" className={styles.img} />
                  <div>{data.name}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.productArea}>
          {items.map((data) => (
            <Link
              to="/shop/shop-detail"
              state={{ data }}
              className={styles.productLinkBox}>
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
