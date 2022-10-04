import { useEffect, useState } from "react";
import { getAccessToken } from "../token";
import { Link } from "react-router-dom";
import styles from "./componentStyles/Bell.module.css";
import { EventSourcePolyfill } from "event-source-polyfill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { BASE_URL, handleData, CURRENT_URL } from "../api";

export default function Bell() {
  const [notice, setNotice] = useState();

  const getTokenInit = () => {
    getAccessToken().then((data) => {
      if (data && data.trim().length !== 0) {
        connectNotice(data);
      }
    });
  };

  const connectNotice = (data) => {
    const eventSource = new EventSourcePolyfill(`${BASE_URL}/notice`, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    });

    eventSource.addEventListener("sse", async (event) => {
      console.log(event.data);
      if (event.data === "connect") {
        return;
      }
      setNotice(true);

      const showNotification = () => {
        const notification = new Notification("알림", {
          body: event.data,
        });

        notification.addEventListener("click", () => {
          window.open(`${CURRENT_URL}/notification`, "알림 왔어요");
        });
      };

      let granted = false;
      if (Notification.permission === "granted") {
        granted = true;
      } else if (Notification.permission !== "denied") {
        let permission = await Notification.requestPermission();
        granted = permission === "granted";
      }

      if (granted) {
        showNotification();
      }
    });
  };

  const isNotice = () => {
    handleData.getData("/notice/list").then((res) => {
      if (res.data >= 1) {
        setNotice(true);
      }
    });
  };

  useEffect(() => {
    getTokenInit();
    isNotice();
  }, []);

  return (
    <Link to="/notification">
      <div className={styles.wrapper}>
        <FontAwesomeIcon className={styles.bell} icon={faBell} />
        <span className={notice ? styles.active : ""}></span>
      </div>
    </Link>
  );
}
