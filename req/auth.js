import axios from "axios";
import { baseURL } from "./config";

export const loginAction = async (params) => {
  try {
    let response = await axios.post(`${baseURL}/login`, params, {
      xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
      withCredentials: true,
    });
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG GET PRODUCT");
  }
};
