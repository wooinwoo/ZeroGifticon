import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./pageStyles/MyProduct.module.css";

function MyProduct() {
  const [dataList, setDataList] = useState({ data: [] });
  const [checkBox, setCheckBox] = useState([]);
  const headerMeta = ["", "분류", "상품명", "가격", "재고", "등록일"];
  console.log(checkBox);
  useEffect(() => {
    axios.get("http://localhost:5000/product").then((res) => {
      setDataList(res);
    });
  }, [checkBox]);
  console.log(1);
  const delBtn = () => {
    if (checkBox.length > 0) {
      checkBox.map((i) => axios.delete(`http://localhost:5000/product/${i}`));
    }
    setCheckBox([]);
  };

  return (
    <>
      <div className={styles.tableContainer}>
        <Link to="/my-product/edit-product">
          <button className={styles.editBtn}>상품 등록</button>
        </Link>
        <button className={styles.delBtn} onClick={delBtn}>
          상품삭제
        </button>
        {dataList.length !== 0 && (
          <table>
            <thead>
              <tr>
                {headerMeta.map((h, idx) => (
                  <th key={`${h} + ${idx}`} className={styles.head}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataList.data.map((d, idx) => {
                return (
                  <TableRow
                    key={`${d.title} + ${idx}`}
                    data={d}
                    checkBox={checkBox}
                    setCheckBox={setCheckBox}
                  />
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default MyProduct;

const TableRow = ({ key, data, checkBox, setCheckBox }) => {
  return (
    <tr key={key} className={styles.cssss}>
      <td>
        <input
          type="checkbox"
          value={[data.id]}
          onClick={(e) => {
            e.target.checked === true
              ? setCheckBox([...checkBox, e.target.value])
              : setCheckBox([...checkBox.filter((i) => i !== e.target.value)]);
          }}
        />
      </td>
      <td>{data.category}</td>
      <td>
        <div className={styles.nameContainer}>
          <img src={data.img} className={styles.productImg} alt="" />
          <span>{data.title}</span>
        </div>
      </td>
      <td> {data.price} </td>
      <td> {data.volume} </td>
      <td> {data.registrationDate} </td>
    </tr>
  );
};
