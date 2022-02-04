import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  userData: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case "REGISTER":
    case "AUTH_SUCCESS":
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case "LOGIN":
    case "AUTH_SUCCESS":
      localStorage.setItem("adminAuth", JSON.stringify(action.payload));
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case "LOGOUT":
    case "AUTH_ERROR":
      localStorage.removeItem("adminAuth");
      return {
        ...state,
        isLogin: false,
        userData: null,
      };
    default:
      console.log("ERR");
      throw new Error("unknown cases");
  }
};

export const UserProvider = (props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};
