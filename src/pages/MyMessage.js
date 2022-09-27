import { useEffect, useState } from "react";
import { handleData } from "../api";
import { Link } from "react-router-dom";
import styles from "./pageStyles/GiftBox.module.css";

function MessageListItem({ item }) {
  return (
    <>
      <div>
        <Link to={`/mypage/message/${item.id}`} state={{ item: item }}>
          <div>메세지 내용</div>
        </Link>
      </div>
    </>
  );
}

function MessageList({ items }) {
  if (items.length === 0)
    return <div className={styles.noItem}>받은 메세지가 없습니다.</div>;
  return (
    <ul className={styles.items}>
      {items.map((item) => {
        return (
          <li key={item.id} className={styles.item}>
            <MessageListItem key={item.id} item={item} />
          </li>
        );
      })}
    </ul>
  );
}

function MyMessage() {
  const [items, setItems] = useState([]);
  const handleLoad = async () => {
    const messages = await handleData.getData("/giftbox");
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
