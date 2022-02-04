import axios from "axios";
import { baseURL } from "./config";

export const postOrder = async (params) => {
  try {
    let response = await axios.post(`${baseURL}/order/add`, params, {
      xsrfHeaderName: "X-XSRF-TOKEN", // change the name of the header to "X-XSRF-TOKEN" and it should works
      withCredentials: true,
      crossDomain: true,
    });
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG ADD ORDER");
  }
};

export const searchOrder = async (params) => {
  try {
    let response = await axios(`${baseURL}/order/search`, {
      method: "POST",
      data: params,
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      withCredentials: true,
      credentials: "same-origin",
    });

    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG ADD ORDER");
  }
};
