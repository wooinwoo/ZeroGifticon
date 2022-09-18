import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./pageStyles/MyProduct.module.css";
import searchImg from "../images/search-icon.svg";

import { getData } from "../api";

function MyProduct() {
  const [dataList, setDataList] = useState([]);
  const [checkBox, setCheckBox] = useState([]);
  const [category, setCategory] = useState("");
  const [searchValue, setSerchValue] = useState("");
  const [filteredData, setFilteredData] = useState(dataList);
  const [initialData, setInitialData] = useState([]);
  const [sort, setSort] = useState("등록순");
  const headerMeta = ["", "분류", "상품명", "가격", "재고", "등록일"];

  useEffect(() => {
    const res = getData("http://localhost:5000/product");
    res.then((val) => {
      setInitialData(val.slice());
      setFilteredData(val);
      setDataList(val);
    });
  }, []);

  useEffect(() => {
    searchFilter();
  }, [dataList]);

  const delBtn = () => {
    if (checkBox.length > 0) {
      checkBox.map((i) => axios.delete(`http://localhost:5000/product/${i}`));
      setDataList(
        dataList.filter((item) => !checkBox.includes(String(item.id)))
      );
    }
    setCheckBox([]);
  };

  const searchFilter = () => {
    let filteredSearchList = dataList;
    if (searchValue) {
      filteredSearchList = dataList.filter((item) =>
        item.title.includes(searchValue)
      );
    }
    if (category) {
      filteredSearchList = filteredSearchList.filter(
        (item) => item.category === category
      );
    }
    setFilteredData(filteredSearchList);
  };

  const onSort = (s) => {
    switch (s) {
      case "최근등록순":
        setDataList([...initialData.slice()].reverse());
        break;
      case "가격낮은순":
        setDataList(
          dataList.sort(function (a, b) {
            return a.price - b.price;
          })
        );
        break;
      case "가격높은순":
        setDataList(
          dataList.sort(function (a, b) {
            return b.price - a.price;
          })
        );
        break;
      case "재고낮은순":
        setDataList(
          dataList.sort(function (a, b) {
            return a.volume - b.volume;
          })
        );
        break;
      case "재고높은순":
        setDataList(
          dataList.sort(function (a, b) {
            return b.volume - a.volume;
          })
        );
        break;
      default:
        setDataList(initialData.slice());
    }
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      searchFilter();
    }
  };

  return (
    <>
      <div className={styles.wrap}>
        <div className={styles.tableContainer}>
          <div className={styles.editArea}>
            <div className={styles.searchArea}>
              <div className={styles.searchBox}>
                <select
                  className={styles.select}
                  onChange={(e) => setCategory(e.target.value)}>
                  <option value="">모든카테고리</option>
                  <option value="식품">식품</option>
                  <option value="음료">음료</option>
                </select>
                <input
                  className={styles.searchFilter}
                  placeholder="상품명 검색"
                  onChange={(e) => setSerchValue(e.target.value)}
                  onKeyPress={onCheckEnter}
                />
                <button
                  className={styles.searchBtn}
                  onClick={() => searchFilter()}>
                  <img src={searchImg} alt="" className={styles.searchImg} />
                </button>
              </div>
              <span className={styles.icon}>⇅</span>
              <select
                className={styles.selectFilter}
                onChange={(e) => {
                  onSort(e.target.value);
                  setSort(e.target.value);
                }}>
                <option value="등록순">등록순</option>
                <option value="최근등록순">최근등록순</option>
                <option value="가격낮은순">가격낮은순</option>
                <option value="가격높은순">가격높은순</option>
                <option value="재고낮은순">재고낮은순</option>
                <option value="재고높은순">재고높은순</option>
              </select>
            </div>
            <div>
              <button className={styles.delBtn} onClick={() => delBtn()}>
                상품삭제
              </button>
              <Link to="/my-product/edit-product">
                <button className={styles.editBtn}>상품 등록</button>
              </Link>
            </div>
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                {headerMeta.map((h, idx) => (
                  <th key={`${h} + ${idx}`} className={styles.head}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            {filteredData.length > 0 ? (
              <tbody>
                {filteredData.map((d, idx) => {
                  return (
                    <TableRow
                      key={`${d.title}+${idx}+${d.price}123`}
                      data={d}
                      checkBox={checkBox}
                      setCheckBox={setCheckBox}
                    />
                  );
                })}
              </tbody>
            ) : (
              <thead>
                <tr>
                  <th>검색 결과 없음</th>
                </tr>
              </thead>
            )}
          </table>
        </div>
      </div>
    </>
  );
}

export default MyProduct;

const TableRow = ({ data, checkBox, setCheckBox }) => {
  return (
    <tr className={styles.cssss}>
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
