import axios from "axios";
import { fetchColumnNamesUrl } from "./apiUrls";
import {toast} from "react-toastify";

const fetchColumnNames = async () => {
  try {
    const response = await axios.get(fetchColumnNamesUrl, {
      withCredentials: true,
    });

    if (response.status === 200) {
      return response.data;
    } else if (response.status === 404) {
      return false;
    }
  } catch (error) {
    toast.error("Sunucu ile iletişim kurulamadı!"); 
    setTimeout(() => {
      window.location.reload();

    }, 2000);
    console.error("fetchAdminControl hatası:", error);
  }
};

export default fetchColumnNames;
