import axios from "axios";

export const BASE_URL = "https://zerogift.p-e.kr";

export async function getToken(url) {
  const response = await axios({
    method: "GET",
    url: url,
  });
  return response.data;
}

export async function updateToken(url, token) {
  const response = await axios({
    method: "POST",
    url: url,
    data: {
      refreshToken: token,
    },
  });
  return response.data;
}

export async function getData(url, token) {
  const response = await axios({
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createData(url, data, token) {
  const response = await axios({
    method: "POST",
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function updateData(url, data, token) {
  const response = await axios({
    method: "PUT",
    url: url,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function deleteData(url, token) {
  const response = await axios({
    method: "DELETE",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
