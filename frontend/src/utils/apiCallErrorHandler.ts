import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BackendErrorResponse } from "core/models/quiz";

export const apiCallErrorHandler = (error: unknown) => {
  const axiosError = error as AxiosError<BackendErrorResponse>;
  if (!axiosError.response) return alert("Wahala");
  const { status, data } = axiosError.response;
  if (status >= 400 && status <= 499) {
    toast.error(data.message);
  } else if (status >= 500 && status <= 599) {
    toast.error("Strange error. Contact support");
  }
  return { errors: data.errors };
};
