import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logOut } from "../token";
import styles from "./componentStyles/Personal.module.css";
import { Link } from "react-router-dom";

function User() {
  return (
    <Link to="/mypage">
      <FontAwesomeIcon className={styles.user} icon={faUser} />
    </Link>
  );
}

function LogOut() {
  const handleClick = async () => {
    await logOut();
  };

  return (
    <FontAwesomeIcon
      className={styles.logout}
      onClick={handleClick}
      icon={faRightFromBracket}
    />
  );
}

function Personal() {
  return (
    <div className={styles.personal}>
      <User />
      <LogOut />
    </div>
  );
}

export default Personal;
