import React, { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  isLogin: false,
  userData: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case "LOGIN":
      return {
        ...state,
        isLogin: true,
        userData: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("adminAuth");
      return {
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
