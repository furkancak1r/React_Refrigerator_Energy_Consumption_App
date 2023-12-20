import axios from "axios";
import { updateRowUrl } from "./apiUrls";
import { toast } from "react-toastify";

export default async function updateRowFn(item, oldSerialNo) {
  try {
    const { TesterName, SerialNo } = item;
    const response = await axios.put(
      updateRowUrl,
      {
        TesterName,
        SerialNo,
        oldSerialNo,
      },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      return true; // Successfully updated
    } else {
      return false; // Update failed
    }
  } catch (error) {
    toast.error("Sunucu ile iletişim kurulamadı!");
    setTimeout(() => {
      window.location.reload();
    }, 2000);
    console.error("Server communication error:", error);
    return false; // Error occurred or update failed
  }
}
