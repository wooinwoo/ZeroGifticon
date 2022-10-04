import { useEffect, useState } from "react";
import { handleData } from "../api";
import styles from "./pageStyles/MyMessage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function MessageListItem({ item }) {
  return (
    <div className={styles.item}>
      <div className={styles.profile}>
        {item.fromMemberImageUrl && (
          <img
            className={styles.img}
            src={item.fromMemberImageUrl}
            alt={item.fromMemberName}
          />
        )}
        {item.fromMemberImageUrl || (
          <FontAwesomeIcon className={styles.user} icon={faUser} />
        )}
      </div>
      <div className={styles.messageInfo}>
        <div className={styles.title}>From. {item.fromMemberName}</div>
        <div className={styles.des}>{item.message}</div>
        <div className={styles.btns}>
          {/* <Link to="/mypage/review/review-detail" state={{ item: item }}>
            <button className={styles.button}>확인하기</button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}

function MessageList({ items }) {
  if (items.length === 0)
    return <div className={styles.noItem}>받은 메세지가 없습니다.</div>;

  return (
    <ul className={styles.items}>
      {items.map((item) => {
        return (
          <li key={item.giftMessageId} className={styles.item}>
            <MessageListItem key={item.giftMessageId} item={item} />
          </li>
        );
      })}
    </ul>
  );
}

function MyMessage() {
  const [items, setItems] = useState([]);

  const handleLoad = async () => {
    const messages = await handleData.getData("/giftMessage/list");
    setItems(messages.data);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
    <>
      <MessageList items={items} />
    </>
  );
}

export default MyMessage;
