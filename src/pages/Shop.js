import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pageStyles/Shop.module.css";

import ListItemLayout from "../components/ListItemLayout";
import viewIcon from "../images/view.svg";
import heartIcon from "../images/heart.svg";
import ScrollWrapper from "../components/ScrollWrapper";

function Shop() {
  const [items, setItems] = useState([]);

  return (
    <ScrollWrapper setItems={setItems} url={"http://localhost:5000/memo"}>
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
    </ScrollWrapper>
  );
}

export default Shop;
