import axios from "axios";
import { baseURL } from "./config";

export const getProducts = async () => {
  try {
    let response = await axios.get(`${baseURL}/products`);
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG GET PRODUCT");
  }
};
