import axios from "axios";
import { addRowUrl } from "./apiUrls";
import {toast} from "react-toastify";

export default async function addRowFn(item) {
  try {
    const {
      TesterName,
      SerialNo,
      ResultMin,
      ResultMax,
      TIName,
      ConditionSet,
      ConditionUnit,
      ResultConditionUnit,
      ResultValue,
      ResultUnit,
      TestTimeSet,
      TestTimeUnit,
      EvaporatorPan,
      DateColumn,
    } = item;
    const response = await axios.post(
      addRowUrl,
      {
        TesterName,
        SerialNo,
        ResultMin,
        ResultMax,
        TIName,
        ConditionSet,
        ConditionUnit,
        ResultConditionUnit,
        ResultValue,
        ResultUnit,
        TestTimeSet,
        TestTimeUnit,
        EvaporatorPan,
        DateColumn,
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
