import axios from "axios";
import { config } from "../helpers/config";
import { getAuthHeader } from "./auth-header";

const baseURL = config.api.baseUrl;

// G01 -- admin manager
export const resetDatabase = async () => {
    const resp = await axios.delete(`${baseURL}/settings/db-reset`, {
        headers:  getAuthHeader()
        
    });
    const data =  resp.data;
    return data;
};