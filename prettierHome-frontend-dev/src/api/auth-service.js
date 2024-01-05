import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

export const login = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/login`, payload);
  const data = await resp.data;
  return data;
};

export const register = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/register`, payload);
  const data = await resp.data;
  return data;
};

export const forgotPassword = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/forgot-password`, payload);
  const data = await resp.data;
  return data;
};
export const resetPassword = async (payload) => {
  const resp = await axios.post(`${baseURL}/users/reset-password`, payload);
  const data = await resp.data;
  return data;
};

// get  the authenticated user.
export const getUser = async () => {
  const resp = await axios.get(`${baseURL}/users/auth`, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
}
export const changePassword = async (payload) => {
  const resp = await axios.patch(`${baseURL}/users/auth`, payload,{
    headers: getAuthHeader()
  });
  const data = await resp.data;
  return data;
};
export const updateUser= async (payload) => {
  const resp = await axios.patch(`${baseURL}/users/auth`, payload,{
    headers: getAuthHeader()
  });
  const data = await resp.data;
  return data;
};
export const deleteUser = async ()=> {
  const resp = await axios.delete(`${baseURL}/users/auth`,{
    headers: getAuthHeader()
  });
  const data = await resp.data;
  return data;
};

