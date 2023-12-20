import React from "react";
import "./settings.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/authContext"; // Import your AuthContext
import AdminLogout from "../../api/adminLogout";
import { toast } from "react-toastify";
import { useLanguage } from "../../languageContext/languageContext";

export default function Settings() {
  const navigate = useNavigate();
  const { loginSuccess, logout } = useAuth(); // Get loginSuccess state and logout function from AuthContext
  const { languageData } = useLanguage();

  const handleSettingsClick = () => {
    navigate('/admin-login');
  };

  const handlePowerClick = async () => {
    try {
      if (loginSuccess) {
        // Check if the user is logged in before attempting to logout
        const response = await AdminLogout();
        if (response) {
          toast.success(languageData.ToastLogOutSuccess, {
            draggable: false,
          });
          logout(); // Use the logout function from AuthContext to clear the authentication status

        } else {
          toast.error(languageData.ToastLogOutError, { draggable: false });
          console.log(response);
        }
      } else {
        // If not logged in, navigate to the login page
        navigate('/admin-login');
      }
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };

  return (
    <div className="settings-container">
      {loginSuccess ? (
        <i
          title="Oturumunu Kapat"
          className="zmdi zmdi-power zmdi-hc-3x d-flex justify-content-end"
          onClick={handlePowerClick}
        ></i>
      ) : (
        <i
          title="Giriş"
          className="zmdi zmdi-settings zmdi-hc-3x d-flex justify-content-end"
          onClick={handleSettingsClick}
        ></i>
      )}
    </div>
  );
}
