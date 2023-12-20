import axios from "axios";
import { fetchLanguageUrl } from "./apiUrls";
import { toast } from "react-toastify";

export default async function fetchLanguageFn(language) {
  try {
    const response = await axios.post(
      fetchLanguageUrl,
      { language },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.error("Veri çekme hatası:", response);
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
