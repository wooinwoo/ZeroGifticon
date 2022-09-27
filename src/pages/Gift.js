import styles from "./pageStyles/Gift.module.css";

import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { handleData } from "../api";

import SearchBar from "../components/SearchBar";

export default function Gift() {
  // const data = useLocation().state;
  const [memberList, setMemberList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState(useLocation().state);
  const defaultImg =
    "http://k.kakaocdn.net/dn/dpk9l1/btqmGhA2lKL/Oz0wDuJn1YV2DIn92f6DVK/img_640x640.jpg";

  useEffect(() => {
    handleData
      .getData(`/member-search/member-list?page=0&size=10`)
      .then((res) => {
        setMemberList(res.data.memberSearchOutputDtoList);
        setFilteredData(res.data.memberSearchOutputDtoList);
      });
  }, []);

  const searchFilter = (searchValue) => {
    let filteredSearchList = memberList;
    if (searchValue) {
      filteredSearchList = memberList.filter((item) =>
        item.nickname.includes(searchValue)
      );
    }
    setFilteredData(filteredSearchList);
  };

  const onErrorImg = (e) => {
    e.target.src = defaultImg;
  };
  console.log(data);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>선물할 친구를 선택해주세요</h1>
      <SearchBar searchFilter={searchFilter} />
      <div className={styles.memberArea}>
        {filteredData.map((d) => (
          <button
            className={styles.profile}
            key={d.id + d.nickname}
            id={d.nickname}
            onClick={() => setData({ ...data, nickname: d.nickname })}>
            {d.profileImageUrl != null ? (
              <img
                className={styles.img}
                src={d.profileImageUrl}
                alt=""
                onError={onErrorImg}
              />
            ) : (
              <img className={styles.img} src={defaultImg} alt="" />
            )}
            <span className={styles.nickname}>{d.nickname}</span>
          </button>
        ))}
      </div>
      <Link to={"/shop/payment"} className={styles.sendBtn} state={data}>
        보내기
      </Link>
    </div>
  );
}
