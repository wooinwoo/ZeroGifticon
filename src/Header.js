import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

import Tabs from "./components/Tabs";
import Bell from "./components/Bell";
import BackButton from "./components/BackButton";
import { cookie, logOut, setAccessToken } from "./token";
import { useEffect } from "react";
import { BASE_URL, updateToken } from "./api";

export default function Header() {
  const navigate = useNavigate();
  const pathname = useLocation().pathname.split("/");
  const path = isNaN(Number(pathname[pathname.length - 1]))
    ? pathname[pathname.length - 1]
    : pathname[pathname.length - 2];

  const pageOption = {
    "": [],
    login: [],
    oauth: [],
    shop: ["tab", "bell"],
    "shop-detail": ["bell", "back"],
    gift: ["bell", "back"],
    "gift-box": ["tab", "bell"],
    "gift-box-detail": ["bell", "back"],
    review: ["bell", "back"],
    thank: ["bell", "back"],
    "my-product": ["tab", "bell"],
    "edit-product": ["tab", "bell", "back"],
    notification: ["back"],
  };

  const checkLogin = async () => {
    if (cookie.get("accessToken") || pageOption[path].length === 0) {
      return;
    }
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken && Date.now() < refreshToken.expires) {
      let response = "";
      try {
        response = await updateToken(`${BASE_URL}/auth/refresh`, refreshToken);
        if (response.state === 200) {
          setAccessToken(response.accessToken);
        }
      } catch (error) {
        logOut();
        navigate("/");
      }
    } else {
      logOut();
      navigate("/");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <>
      {pageOption[path].length !== 0 && (
        <div className={styles.header}>
          선물하기
          {pageOption[path].includes("bell") ? <Bell /> : ""}
          {pageOption[path].includes("back") ? <BackButton /> : ""}
        </div>
      )}
      {pageOption[path].includes("tab") ? <Tabs /> : ""}
      <Outlet />
    </>
  );
}
