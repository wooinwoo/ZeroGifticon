import { Outlet, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

import Tabs from "./components/Tabs";
import Bell from "./components/Bell";
import BackButton from "./components/BackButton";
import { logOut } from "./token";

export default function Header() {
  const pathname = useLocation().pathname.split("/");
  const path = isNaN(Number(pathname[pathname.length - 1]))
    ? pathname[pathname.length - 1]
    : pathname[pathname.length - 2];

  const pageOption = {
    "": [],
    login: [],
    oauth: [],
    signup: [],
    shop: ["tab", "bell"],
    "shop-detail": ["bell", "back"],
    gift: ["bell", "back"],
    payment: ["bell", "back"],
    "gift-box": ["tab", "bell"],
    "gift-box-detail": ["bell", "back"],
    "gift-review": ["bell", "back"],
    "gift-message": ["bell", "back"],
    "my-product": ["tab", "bell"],
    "edit-product": ["tab", "bell", "back"],
    mypage: ["tab", "bell"],
    review: ["tab", "bell", "back"],
    "review-detail": ["tab", "bell", "back"],
    message: ["tab", "bell", "back"],
    notification: ["back"],
  };

  const handleLogout = async () => {
    await logOut();
  };

  return (
    <>
      {pageOption[path].length !== 0 && (
        <div className={styles.header}>
          <div className={styles.logo}>
            <div className={styles.des}>마음을 선물해요</div>
            <div className={styles.title}>ZeroGift</div>
          </div>
          {pageOption[path].includes("bell") ? <Bell /> : ""}
          {pageOption[path].includes("back") ? <BackButton /> : ""}
          <div className={styles.menu}>
            {pageOption[path].includes("tab") ? (
              <>
                <Tabs />
                <button className={styles.logoutBtn} onClick={handleLogout}>
                  로그아웃
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
      <Outlet />
    </>
  );
}
