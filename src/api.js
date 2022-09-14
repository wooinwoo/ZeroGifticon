import axios from "axios";

export const REVIEW_URL = "http://localhost:5000/review";
export const PRODUCT_URL = "http://localhost:5000/product";
export const TEMP_URL = "http://localhost:5000/memo";
export const BASE_URL = "https://zerogift.p-e.kr";

export async function getData(url) {
  const response = await axios({
    method: "GET",
    url: url,
  });
  return response.data;
}

export async function createData(url, data) {
  console.log(url);
  console.log(data);
  const response = await axios({
    method: "POST",
    url: url,
    data: data,
  });

  console.log(response);

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
