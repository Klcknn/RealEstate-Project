import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

// G01 -- admin manager
export const getStatistics = async () => {
    const resp = await axios.get(`${baseURL}/report`, {
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};
export const getAllAdvertsReport = async (payload) => {
    const resp = await axios.get(`${baseURL}/report/adverts?startDate=${payload.startDate}&endDate=${payload.endDate}&category=${payload.category}&type=${payload.type}&status=${payload.status}` ,{
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};
export const getProperties = async (amount) => {
    const resp = await axios.get(`${baseURL}/report/most-popular-properties?amount=${amount}` ,{
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};
export const getUsers = async (role) => {
    const resp = await axios.get(`${baseURL}/report/users?role=${role}` ,{
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};
export const getTourRequests = async (payload) => {
    const resp = await axios.get(`${baseURL}/report/tour-requests?startDate=${payload.startDate}&endDate=${payload.endDate}&status=${payload.status}` ,{
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};