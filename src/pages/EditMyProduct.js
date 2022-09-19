import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./pageStyles/EditMyProduct.module.css";
import cx from "clsx";

function EditMyProduct() {
  const [productState, setProductState] = useState({
    img: "",
    title: "",
    category: "없음",
    price: 0,
    volume: 0,
    registrationDate: "",
    description: "",
  });

  const post_data = async () => {
    const now = new Date();
    await axios
      .post("http://localhost:5000/product", {
        ...productState,
        registrationDate: `${now.getFullYear()}-${
          now.getMonth() + 1
        }-${now.getDate()}`,
      })
      .then(function (response) {
        console.log(response); //성공
      });
  };
  return (
    <div className={styles.Container}>
      <div className={styles.editArea}>
        <div>
          <div className={styles.name}>상품명</div>
          <input
            className={cx(styles.input, styles.titleInput)}
            placeholder="상품명"
            onChange={(e) =>
              setProductState({ ...productState, title: e.target.value })
            }
          />
        </div>
        <div className={styles.selecArea}>
          <span className={styles.name}>카테고리</span>
          <select
            onChange={(e) =>
              setProductState({ ...productState, category: e.target.value })
            }>
            <option value=""></option>
            <option value="식품">식품</option>
            <option value="음료">음료</option>
          </select>
        </div>
        <div className={styles.selecArea}>
          <span className={styles.name}>사진 선택</span>
          <input
            type="file"
            accept="image/*"
            placeholder=""
            onChange={(e) =>
              setProductState({ ...productState, img: e.target.value })
            }
          />
        </div>
        <div>
          <div className={styles.name}>가격</div>
          <input
            className={cx(styles.input, styles.priceInput)}
            placeholder="가격"
            onChange={(e) =>
              setProductState({ ...productState, price: e.target.value })
            }
          />
        </div>
        <div>
          <div className={styles.name}>수량</div>
          <input
            className={cx(styles.input, styles.volumeInput)}
            placeholder="수량"
            onChange={(e) =>
              setProductState({ ...productState, volume: e.target.value })
            }
          />
        </div>
        <div>
          <div className={styles.name}>설명</div>
          <input
            className={cx(styles.input, styles.descriptionInput)}
            placeholder="설명"
            onChange={(e) =>
              setProductState({ ...productState, description: e.target.value })
            }
          />
        </div>
        <Link to={"/my-product"} className={styles.saveBtn} onClick={post_data}>
          저장
        </Link>
      </div>
    </div>
  );
}

export default EditMyProduct;
