import apiUrls from "./apiUrls";
import { toast } from "react-toastify";

export default async function AdminLogout() {
  try {
    const urlBeginning = apiUrls.adminLogoutUrl;
    const response = await fetch(urlBeginning, {
      method: "POST", // POST isteği ile oturumu kapatmayı yapacağız
      credentials: "include", // Oturum kimlik bilgilerini dahil etmek için
    });

    return response.ok; // true ise başarılı, false ise başarısız
  } catch (error) {
    toast.error("Sunucu ile iletişim kurulamadı!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    console.error("Oturum kapatma hatası: ", error);
    return false; // Hata durumunda false döndür
  }
}
