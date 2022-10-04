import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleData } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./pageStyles/MyPage.module.css";

function MyPage() {
  const [item, setItem] = useState([]);
  const [profile, setProfile] = useState("");

  const getProfile = async (id) => {
    const response = await handleData.getData("/member-search/member-list");
    const memberlist = response.data.memberSearchOutputDtoList;
    memberlist.forEach((member) => {
      if (member.id === id) {
        setProfile(member.profileImageUrl);
      }
    });
  };

  const handleLoad = async () => {
    const response = await handleData.getData("/member-search/member");
    setItem(response.data);
    getProfile(item.id);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <div className={styles.mypage}>
      <div className={styles.profile}>
        {!profile && <FontAwesomeIcon className={styles.user} icon={faUser} />}
        {profile && (
          <img className={styles.user} src={profile} alt={item.nickname} />
        )}
      </div>
      <div className={styles.myInfo}>
        <div className={styles.nickname}>{item.nickname}</div>
        <div className={styles.point}>포인트 {item.point}</div>
        <div className={styles.btns}>
          <Link to={"/mypage/review"}>
            <button className={styles.btn}>작성한 리뷰 확인하기</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
