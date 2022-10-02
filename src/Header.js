import { Outlet, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

import Tabs from "./components/Tabs";
import Bell from "./components/Bell";
import BackButton from "./components/BackButton";
import Personal from "./components/Personal";

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
    "gift-box": ["tab", "bell"],
    "gift-box-detail": ["bell", "back"],
    "gift-review": ["bell", "back"],
    "gift-message": ["bell", "back"],
    "my-product": ["tab", "bell"],
    "edit-product": ["tab", "bell", "back"],
    mypage: ["tab", "bell"],
    review: ["tab", "bell", "back"],
    "review-detail": ["tab", "bell", "back"],
    notification: ["back"],
  };

  return (
    <>
      {pageOption[path].length !== 0 && (
        <div className={styles.header}>
          선물하기
          {pageOption[path].includes("bell") ? <Bell /> : ""}
          {pageOption[path].includes("back") ? <BackButton /> : ""}
          <Personal />
        </div>
      )}
      {pageOption[path].includes("tab") ? <Tabs /> : ""}
      <Outlet />
    </>
  );
}
