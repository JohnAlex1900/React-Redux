import React from "react";
import { useNotification } from "../contexts/NotificationContext";

const Notification = () => {
  const {
    state: { message, type },
  } = useNotification();

  if (!message) return null;

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    color: type === "error" ? "red" : "green",
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
