import { useNavigate } from "react-router-dom";
import styles from "./componentStyles/BackButton.module.css";

export default function BackButton() {
  let navigate = useNavigate();
  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      {"<"}
    </button>
  );
}
