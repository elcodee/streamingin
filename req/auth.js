import { API } from "./config";

export const loginAction = async (params) => {
  try {
    let response = await API.post("/login", params);
    // console.log("RES ADD ORDER", response);
    return response?.data;
  } catch (error) {
    console.log("ERR CONFIG LOGIN", error);
  }
};
