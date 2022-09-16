import { SyncLoader } from "react-spinners";
import styles from "./componentStyles/Loading.module.css";

function Loading() {
  return (
    <div className={styles.loading}>
      <SyncLoader color="navy" margin={18} />
      <div className={styles.des}>
        <div className={styles.content}>페이지를 불러오고 있습니다.</div>
        <div className={styles.content}>잠시만 기다려 주세요.</div>
      </div>
    </div>
  );
}

export default Loading;
