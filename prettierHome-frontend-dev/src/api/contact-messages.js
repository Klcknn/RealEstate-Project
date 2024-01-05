import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";


const baseURL = config.api.baseUrl;

// TODO J02 SEND MESSAGE
export const sendMessage = async (payload) => {
  const resp = await axios.post(`${baseURL}/contact-messages`, payload, {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};

// TODO J01 - GetAll()
export const getAllContactMessage = async (query, page=0, size=20, sort="id", type="asc") => {
  
  const resp = await axios.get(`${baseURL}/contact-messages?query=${query}&page=${page}&size=${size}&sort=${sort}&type=${type}`,  {
    headers: getAuthHeader(),
  });
  const data = await resp.data;
  return data;
};
