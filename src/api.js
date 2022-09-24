import axios from "axios";
import { getAccessToken } from "./token";

export const BASE_URL = "https://zerogift.p-e.kr";

export const handleData = {
  getToken: async (url) => {
    const response = await axios({
      method: "GET",
      url: `${BASE_URL}${url}`,
    });
    return response.data;
  },

  updateToken: async (url, token) => {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}${url}`,
      data: token,
    });
    return response.data;
  },

  getEmailToken: async (url, data) => {
    const response = await axios({
      method: "POST",
      url: `${BASE_URL}${url}`,
      data: data,
    });
    return response.data;
  },

  sendLogOut: async (url) => {
    const token = await getAccessToken();

    const response = await axios({
      method: "get",
      url: `${BASE_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  getData: async (url) => {
    const token = await getAccessToken();

    const response = await axios({
      method: "GET",
      url: `${BASE_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },

  createData: async (url, data) => {
    const token = await getAccessToken();

    const response = await axios({
      method: "POST",
      url: `${BASE_URL}${url}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
  PutData: async (url, data) => {
    const token = await getAccessToken();

    const response = await axios({
      method: "PUT",
      url: `${BASE_URL}${url}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  PatchData: async (url, data) => {
    const token = await getAccessToken();

    const response = await axios({
      method: "PATCH",
      url: `${BASE_URL}${url}`,
      data: data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },

  deleteData: async (url) => {
    const token = await getAccessToken();

    const response = await axios({
      method: "DELETE",
      url: `${BASE_URL}${url}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  },
};

export async function getToken(url) {
  const response = await axios({
    method: "GET",
    url: `${BASE_URL}${url}`,
  });
  return response.data;
}

export async function updateToken(url, token) {
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}${url}`,
    data: {
      refreshToken: `${token}`,
    },
  });
  return response.data;
}

export async function getData(url) {
  const token = await getAccessToken();

  const response = await axios({
    method: "GET",
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function createData(url, data) {
  const token = await getAccessToken();
  const response = await axios({
    method: "POST",
    url: `${BASE_URL}${url}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function PutData(url, data) {
  const token = await getAccessToken();
  const response = await axios({
    method: "PUT",
    url: `${BASE_URL}${url}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export async function PatchData(url, data) {
  const token = await getAccessToken();
  const response = await axios({
    method: "PATCH",
    url: `${BASE_URL}${url}`,
    data: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export async function deleteData(url) {
  const token = await getAccessToken();
  const response = await axios({
    method: "DELETE",
    url: `${BASE_URL}${url}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}
