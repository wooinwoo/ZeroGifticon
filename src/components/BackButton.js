import { useNavigate } from "react-router-dom";
import styles from "./componentStyles/BackButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  let navigate = useNavigate();
  return (
    <button className={styles.backButton} onClick={() => navigate(-1)}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </button>
  );
}
