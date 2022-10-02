import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./pageStyles/EditMyProduct.module.css";
import cx from "clsx";
import { handleData } from "../api";
import { useForm } from "react-hook-form";

function EditMyProduct() {
  const [files, setFiles] = useState("");
  const data = useLocation();
  const [productState, setProductState] = useState({
    // img: "",
    name: "",
    category: "없음",
    price: 0,
    count: 0,
    productImageIds: [],
    description: "",
  });

  const uploadFileHandler = (event) => {
    setFiles(event.target.files);
  };

  const fileSubmitHandler = () => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append(`files`, files[i]);
    }
    console.log(formData);
    handleData
      .createData("/admin/upload", formData)
      .then(async (response) => {
        const imgIds = [];
        response.data.map((e) => imgIds.push(e.productImageId));
        setProductState({ ...productState, productImageIds: imgIds });
        if (!response.ok) {
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
      .catch((error) => {
        console.error("Error while uploading file!", error);
      });
  };

  const post_data = async () => {
    const now = new Date();
    handleData
      .createData("/admin/product", {
        ...productState,
        // productImageIds: files,
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
              setProductState({ ...productState, name: e.target.value })
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
            <option value="BIRTHDAY">BIRTHDAY</option>
            <option value="CLOTH">CLOTH</option>
            <option value="COSMETIC">COSMETIC</option>
            <option value="DELIVERY">DELIVERY</option>
            <option value="FOOD">FOOD</option>
            <option value="GIFTCARD">GIFTCARD</option>
            <option value="HEALTH">HEALTH</option>
            <option value="LUXURY">LUXURY</option>
            <option value="OTHER">OTHER</option>
          </select>
        </div>
        <div className={styles.selecArea}>
          <span className={styles.name}>사진 선택</span>
          <form encType="multipart/form-data">
            <input
              type="file"
              accept="image/*"
              placeholder=""
              onChange={(e) => uploadFileHandler(e)}
              multiple
            />
            <button type="button" onClick={(e) => fileSubmitHandler(e)}>
              버튼
            </button>
          </form>
        </div>
        <div>
          <div className={styles.name}>가격</div>
          <input
            className={cx(styles.input, styles.priceInput)}
            placeholder="가격"
            onChange={(e) =>
              setProductState({
                ...productState,
                price: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div>
          <div className={styles.name}>수량</div>
          <input
            className={cx(styles.input, styles.volumeInput)}
            placeholder="수량"
            onChange={(e) =>
              setProductState({
                ...productState,
                count: parseInt(e.target.value),
              })
            }
          />
        </div>
        <div>
          <div className={styles.name}>설명</div>
          <textarea
            className={cx(styles.input, styles.descriptionInput)}
            placeholder="설명"
            onChange={(e) =>
              setProductState({ ...productState, description: e.target.value })
            }
          />
        </div>
        <Link
          to={"/my-product"}
          className={styles.saveBtn}
          onClick={() => post_data()}>
          저장
        </Link>
      </div>
    </div>
  );
}

export default EditMyProduct;
