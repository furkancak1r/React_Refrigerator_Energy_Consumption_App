import axios from "axios";
import { testerNamesUrl } from "./apiUrls";
import { toast } from "react-toastify";

export default async function fetchTesterNames() {
  try {
    const response = await axios.get(testerNamesUrl, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Veri çekme hatası:", response);
      toast.error("Sunucu ile iletişim kurulamadı!");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      return null;
    }
  } catch (error) {
    toast.error("Sunucu ile iletişim kurulamadı!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    console.error("Veri çekme hatası:", error);
    return "error";
  }
}
