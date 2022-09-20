import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";

import Tabs from "./components/Tabs";
import Bell from "./components/Bell";
import BackButton from "./components/BackButton";
import { logOut, setAccessToken } from "./token";
import { useEffect } from "react";
import { handleData } from "./api";

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
    const accessTokenBefore = window.localStorage.getItem("accessToken");
    const accessToken = JSON.parse(accessTokenBefore);
    if (accessToken) {
      const accessExpires = Date.parse(accessToken.expires);
      let now = new Date();
      if (accessExpires > now) {
        window.localStorage.removeItem("accessToken");
      }
    }
    if (accessToken) {
      return;
    }
    const refreshTokenBefore = window.localStorage.getItem("refreshToken");
    const refreshToken = JSON.parse(refreshTokenBefore);

    if (refreshToken) {
      const refreshExpires = Date.parse(refreshToken.expires);
      let now = new Date();
      if (refreshExpires > now) {
        logOut();
      }
    }

    if (refreshToken) {
      let response = "";
      try {
        response = await handleData.updateToken(`/auth/refresh`);
        if (response.status === 200) {
          setAccessToken(response.data.accessToken);
        }
      } catch (error) {
        window.localStorage.removeItem("refreshToken");
        navigate("/");
      }
    } else {
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
