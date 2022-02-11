import axios from "axios";
import { API } from "./config";

export const postOrder = async (params) => {
  try {
    let response = await API.post("/order/add", params);
    // console.log("RES ADD ORDER", response);
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG ADD ORDER", error);
  }
};

export const searchOrder = async (params) => {
  try {
    let response = await API.post("/order/search", params);
    // console.log("RES SEARCH ORDER", response);
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG SEARCH ORDER", error.response);
  }
};

export const getAllOrder = async (params) => {
  try {
    let response = await API.get("/orders");
    // console.log("RES ALL ORDER", response?.data);
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG ADD ORDER", error);
  }
};

export const updateOrder = async (id, params) => {
  try {
    let response = await API.post(`/order/update/${id}`, params);
    // console.log("RES SEARCH ORDER", response);
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG SEARCH ORDER", error.response);
  }
};
