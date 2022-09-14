import axios from "axios";

export const TEMP_URL = "http://localhost:5000/memo";
export const BASE_URL = "https://zerogift.p-e.kr";

export async function getData(url) {
  const response = await axios({
    method: "GET",
    url: url,
  });
  return response.data;
}

export async function createData(url, formData) {
  const response = await axios({
    method: "POST",
    url: url,
    body: formData,
  });

  return response.data;
}

export async function updateData(url, formData) {
  const response = await axios({
    method: "PUT",
    url: url,
    body: formData,
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
