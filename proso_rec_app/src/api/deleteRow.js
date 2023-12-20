import { deleteRowUrl } from "./apiUrls";
import {toast} from "react-toastify";

export default async function deleteRow(IdForRow) {
  try {
    const response = await fetch(deleteRowUrl, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({IdForRow}),
    });
    if (response.status === 200) {
      // Başarılı yanıt durumu
      return true;
    } else if (response.status === 404) {
      // Veri bulunamadı durumu
      return false;
    } else {
      // Diğer hatalar için
      return false;
    }
  } catch (error) {
    toast.error("Sunucu ile iletişim kurulamadı!"); 
    setTimeout(() => {
      window.location.reload();

    }, 2000);
    // Hata durumu
    console.error("Server communication error:", error);

    return false;
  }
}
