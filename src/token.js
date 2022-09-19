import { Cookies } from "react-cookie";
import { BASE_URL, getData } from "./api";

export const cookie = new Cookies();

export const logOut = async (token) => {
  cookie.remove("accessToken");
  localStorage.removeItem("refreshToken");
  if (token) {
    const response = getData(`${BASE_URL}/auth/logout`, token);
    if (response.status !== 200)
      alert('로그아웃에 실패했습니다.');
  }
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