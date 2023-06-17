"use client";
import { toast } from "react-toastify";

const ToastComponent = ({ message, type }) => {
  switch (type) {
    case "success":
      return toast.success(message);
      break;
    case "error":
      return toast.error(message);
      break;
    case "warn":
      return toast.warn(message);
      break;
    case "info":
      return toast.info(message);
      break;

    default:
      return toast(message);
      break;
  }
};

export default ToastComponent;
