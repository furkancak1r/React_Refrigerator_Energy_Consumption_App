import axios from "axios";
import { adminControlUrl } from "./apiUrls";

const fetchAdminControl = async () => {
  try {
    const response = await axios.get(adminControlUrl, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 401) {
      return false;
    }
  } catch (error) {
    console.error("fetchAdminControl hatası:", error);
    if (error.response.status !== 401) {
      return "errors";
    } else if (error.response.status === 401) {
      return false;
    } else if (error.message === "Network Error") {
      return "Network Error";
    } else {
      return false;
    }
  }
};

export default fetchAdminControl;
