import { Cookies } from "react-cookie";
import { BASE_URL, getData } from "./api";

export const cookie = new Cookies();

export const logOut = async () => {
  if (cookie.get("accessToken")) {
    const token = cookie.get("accessToken");
    getData(`${BASE_URL}/auth/logout`, token);
    cookie.remove("accessToken");
  }
  if (localStorage.getItem("refreshToken"))
    localStorage.removeItem("refreshToken");
  alert("로그인 후 이용 가능합니다.");
};

export const setAccessToken = (accessToken) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 30);
  cookie.set("accessToken", accessToken, {
    path: "/",
    expires,
    secure: true,
    httpOnly: true,
  });
};

export const setRefreshToken = (refreshToken) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 1440);
  localStorage.setItem("refreshToken", {
    token: refreshToken,
    expires: expires,
  });
};
