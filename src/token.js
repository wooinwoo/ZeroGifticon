import { handleData } from "./api";

export const logOut = async () => {
  window.localStorage.clear();
  alert("로그인 후 이용 가능합니다.");
};

export const setAccessToken = (accessToken) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 30);
  const obj = {
    token: accessToken,
    expires: expires,
  };
  const objString = JSON.stringify(obj);
  window.localStorage.setItem("accessToken", objString);
};

export const setRefreshToken = (refreshToken) => {
  const expires = new Date();
  expires.setMinutes(expires.getMinutes() + 1440);
  const obj = {
    token: refreshToken,
    expires: expires,
  };
  const objString = JSON.stringify(obj);
  window.localStorage.setItem("refreshToken", objString);
};

export async function getAccessToken() {
  const accessToken = JSON.parse(window.localStorage.getItem("accessToken"));

  if (accessToken) {
    const accessExpires = new Date(accessToken.expires.slice(0, -1));
    let now = new Date();
    if (accessExpires > now) {
      window.localStorage.removeItem("accessToken");
    }
  }

  if (accessToken) {
    return accessToken.token;
  }

  const refreshToken = JSON.parse(window.localStorage.getItem("refreshToken"));

  if (refreshToken) {
    const refreshExpires = new Date(refreshToken.expires.slice(0, -1));
    let now = new Date();
    if (refreshExpires > now) {
      window.localStorage.removeItem("refreshToken");
    }
  }

  if (refreshToken) {
    let response = "";
    try {
      response = await handleData.updateToken(
        `/auth/refresh`,
        refreshToken.token
      );
      if (response.status === 200) {
        setAccessToken(response.data.accessToken);
        return response.data.accessToken;
      }
    } catch (error) {
      window.localStorage.removeItem("refreshToken");
    }
  }

  logOut();
  window.location.href = "https://zerogifticon.kro.kr";
}
