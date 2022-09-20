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
