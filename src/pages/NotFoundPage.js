import { Link } from "react-router-dom";
import styles from "./pageStyles/NotFoundPage.module.css";

function NotFoundPage() {
  return (
    <div className={styles.notFound}>
      <h1 className={styles.title}>OOPS!</h1>
      <p className={styles.p}>요청하신 페이지를 찾을 수 없습니다.</p>
      <p className={styles.p}>다시 한번 확인 후 이용해 주시기 바랍니다.</p>
      <Link to="/shop">
        <button className={styles.button}>메인으로 돌아가기</button>
      </Link>
    </div>
  );
}

export default NotFoundPage;
