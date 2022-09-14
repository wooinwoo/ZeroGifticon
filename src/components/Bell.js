import { Link } from "react-router-dom";
import styles from "./componentStyles/Bell.module.css";

import bellIcon from "../images/bell_notification.svg";

export default function Bell() {
  return (
    <Link to="/notification">
      <img src={bellIcon} className={styles.bell} alt="" />
    </Link>
  );
}
