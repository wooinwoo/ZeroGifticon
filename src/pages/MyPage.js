import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleData } from "../api";

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
    <>
      <div>
        <div>내 정보</div>
        <img src={profile} alt={item.nickname}></img>
        <div>이메일: {item.email}</div>
        <div>닉네임: {item.nickname}</div>
        <div>포인트: {item.point}</div>
      </div>
      <Link to={"/mypage/message"}>
        <div>받은 메세지함</div>
      </Link>
      <Link to={"/mypage/review"}>
        <div>내가 작성한 리뷰</div>
      </Link>
    </>
  );
}

export default MyPage;
