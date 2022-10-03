import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { handleData } from "../api";
import styles from "./pageStyles/Notification.module.css";
import dayjs from "dayjs";

function Notification() {
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState([]);

  const isNotNull = (data) => {
    if (data === undefined || !data || data.length === 0) {
      return true;
    }
    return false;
  };

  const handlerLoad = () => {
    handleData.getData("/notice/list").then((res) => {
      setNotification(res.data);
      setLoading(false);
    });
  };

  const switchUrl = (type, id) => {
    switch (type) {
      case "gift":
        return `/gift-box/gift-box-detail/${id}`;
      case "message":
        return `/gift-box/gift-message`;
      default:
        return `/shop-detail/${id}`;
    }
  };

  useEffect(() => {
    handlerLoad();
  }, []);

  if (loading) return <div className={styles.default}>loading..</div>;
  if (isNotNull(notification))
    return <div className={styles.default}>알림이 존재 하지 않습니다.</div>;
  return (
    <div>
      {notification.map((d, idx) => (
        <div key={idx} className={styles.wrap}>
          <div className={styles.itemWrap}>
            <Link
              className={styles.itemWrap}
              to={`${switchUrl(d.noticeType, d.noticeTypeId)}`}
              state={{ item: { id: d.noticeTypeId } }}
            >
              <div className={styles.item}>{d.message}</div>
              <div className={styles.itemInfo}>
                <span>선물</span>
                <span>{d.fromMemberNickName}</span>
                <span>{dayjs(d.createdDate).format("YYYY-MM-DD")}</span>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Notification;
