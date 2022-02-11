import { API } from "./config";

export const getProducts = async () => {
  try {
    let response = await API.get("/products");
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG GET PRODUCT", error);
  }
};
