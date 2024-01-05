import axios from "axios";
import { config } from "../helpers/config";
import { formdataHeader, getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const saveAdvertType = async (payload) => {
  const resp = await axios.post(`${baseURL}/advert-types`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const getAdvertTypeById = async (id) => {
  const resp = await axios.get(`${baseURL}/advert-types/${id}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};
export const getAllAdvertType = async () => {
  const resp = await axios.get(`${baseURL}/advert-types/all`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const updateAdvertType = async (id, payload) => {
  const resp = await axios.put(`${baseURL}/advert-types/${id}`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

export const deleteAdvertType = async (id) => {
  const resp = await axios.delete(`${baseURL}/advert-types/${id}`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};
