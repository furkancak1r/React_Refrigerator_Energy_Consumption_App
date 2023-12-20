import { useEffect } from "react";
import { useAuth } from "../../authContext/authContext";
import fetchAdminControl from "../../api/fetchAdminControl";
import { useLanguage } from "../../languageContext/languageContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AdminControlSet() {
  const { login, logout, setLoginInfoFn, loginSuccess } = useAuth();
  const { languageData } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdminControl();
        if (data && data !== "Network Error") {
          login();
          setLoginInfoFn(data.username);
        } else if (loginSuccess) {
          logout();
          setLoginInfoFn("");
          console.clear();

          toast.error(languageData.ToastLogOutTimeOut, {
            draggable: false,
          });
        } else if (data === "Network Error") {
          navigate("/internal-error");
          logout();
          setLoginInfoFn("");
          console.clear();
        } else {
          logout();
          setLoginInfoFn("");
          console.clear();
        }
      } catch (error) {
        console.clear();
        logout();
        setLoginInfoFn("");
      }
    };
    fetchData();
    setInterval(fetchData, 600000);
    // eslint-disable-next-line
  }, []);

  return null;
}

export default AdminControlSet;
