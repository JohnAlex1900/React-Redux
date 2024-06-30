import React, { createContext, useReducer, useContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return { message: action.payload, type: "success" };
    case "SET_ERROR":
      return { message: action.payload, type: "error" };
    case "CLEAR_NOTIFICATION":
      return { message: "", type: "" };
    default:
      return state;
  }
};

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: "",
    type: "",
  });

  return (
    <NotificationContext.Provider value={{ state, dispatch }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};
