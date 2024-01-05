import { getFromLocalStorage } from "../helpers/function/encrypted-storage";

export const getAuthHeader =  () =>{
    const token = getFromLocalStorage("token");

    let header = {};
    if (token) {
       
        header = {
            Authorization:`Bearer ${token}` 
        }
    }
    return header;
}




export const formdataHeader =  () =>{
    const token = getFromLocalStorage("token");

    let header = {};
    if (token) {
       
        header = {
            Authorization:`Bearer ${token}` ,
            'Content-Type': 'multipart/form-data'
        }
    }
    return header;
}