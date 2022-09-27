import { useState } from "react";
import styles from "../components/componentStyles/SearchBar.module.css";
import searchImg from "../images/search-icon.svg";
export default function SerchBar({ searchFilter }) {
  const [searchValue, setSerchValue] = useState("");
  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      searchFilter(searchValue);
    }
  };
  return (
    <div className={styles.searchBox}>
      <input
        className={styles.searchFilter}
        placeholder="검색"
        onChange={(e) => setSerchValue(e.target.value)}
        onKeyPress={onCheckEnter}
      />
      <button
        className={styles.searchBtn}
        onClick={() => searchFilter(searchValue)}>
        <img src={searchImg} alt="" className={styles.searchImg} />
      </button>
    </div>
  );
}
