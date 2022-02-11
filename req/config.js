import axios from "axios";

// const baseURL = "https://streamingin.elcodee.com/v1/api";
const baseURL = "http://127.0.0.1:8000/api";

export const API = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    // "Access-Control-Allow-Origin": "*",
    "Content-Type":
      "application/x-www-form-urlencoded; charset=UTF-8;application/json",
    // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});
