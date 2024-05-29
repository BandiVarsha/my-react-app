import Axios from "axios";
export const axios = Axios.create({
  baseURL: process.env.REACT_APP_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "*/*",
    Authorization: `Bearer ${"kmeBe6KSrMj82nd5OEUb8w"}` || "",
  },
});
