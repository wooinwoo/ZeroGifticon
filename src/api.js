import axios from "axios";

export const BASE_URL = "https://zerogift.p-e.kr";

export async function getData(url) {
  const response = await axios({
    method: "GET",
    url: url,
  });
  return response.data;
}

export async function getMember(url, token) {
  const response = await axios({
    method: "GET",
    url: url,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createData(url, data) {
  const response = await axios({
    method: "POST",
    url: url,
    data: data,
  });

  return response.data;
}

export async function updateData(url, data) {
  const response = await axios({
    method: "PUT",
    url: url,
    data: data,
  });

  return response.data;
}

export async function deleteData(url) {
  const response = await axios({
    method: "DELETE",
    url: url,
  });

  return response.data;
}
