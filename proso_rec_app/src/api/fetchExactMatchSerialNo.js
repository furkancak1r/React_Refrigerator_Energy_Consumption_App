import debounce from "lodash/debounce";
import axios from "axios";
import { fetchExactMatchSerialNoUrl } from "./apiUrls";
import { toast } from "react-toastify";

export default async function fetchExactMatchSerialNo(SerialNo) {
  // Create a promise that will resolve with the result of the debounced function
  let resolvePromise;
  const resultPromise = new Promise((resolve) => {
    resolvePromise = resolve;
  });

  const debouncedFetchDataBySerialNumber = debounce(async () => {
    try {
      const response = await axios.post(
        fetchExactMatchSerialNoUrl,
        { SerialNo },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const jsonData = response.data;
        // Resolve the promise with the data
        resolvePromise(Array.isArray(jsonData) ? jsonData : [jsonData]);
      } else {
        // Resolve the promise with null
        resolvePromise(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Resolve the promise with a string
        resolvePromise("Data not found");
      } else {
        console.error("Veri çekme hatası:", error);
        toast.error("Sunucu ile iletişim kurulamadı!");
        setTimeout(() => {
          window.location.reload();
        }, 2000);
        // Reject the promise with the error
        resolvePromise(error);
      }
    }
  }, 500); // Debounce for 500ms

  // Check if the previous request is still pending
  if (debouncedFetchDataBySerialNumber.pending) {
    return debouncedFetchDataBySerialNumber.flush();
  }

  // Send the request
  debouncedFetchDataBySerialNumber();

  // Return the promise of the result
  return resultPromise;
}
