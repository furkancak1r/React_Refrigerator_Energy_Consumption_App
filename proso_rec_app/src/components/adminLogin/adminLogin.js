import React, { useState } from "react";
import LoginAdmin from "../../api/loginAdmin";
import "./adminLogin.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../authContext/authContext";
import { toast } from "react-toastify";
import { useLanguage } from "../../languageContext/languageContext";


export default function AdminLogin() {
  const navigate = useNavigate();

  const { login, logout, setLoginInfoFn } = useAuth();
  const { languageData } = useLanguage();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const isMatch = await LoginAdmin(username, password);

      if (isMatch) {
        login();
        setLoginInfoFn(username);
        toast.success(languageData.ToastLoginSuccess, {
          draggable: false,
        });

        setTimeout(() => {
          navigate('/');
        }, 1800);
      } else {
        console.log("kullanıcı adı veya şifre yanlış");
        toast.error(languageData.ToastLoginError, {
          draggable: false,
        });
        logout();
        setPassword("");
      }
    } catch (error) {
      console.error("Giriş hatası:", error);
    }
  };

  return (
    <div className="admin-login-page-container">

      <div className="admin-login-container">
        <h2 className="admin-title">Admin Panel</h2>
        <div className="admin-input-container">
          <input
            type="text"
            name="Kullanıcı Adı"
            className="admin-input"
            placeholder="Kullanıcı Adı"
            value={username}
            onChange={handleUsernameChange}
          />
          <i className="zmdi zmdi-account zmdi-hc-lg admin-icon"></i>
        </div>

        <div className="admin-input-container">
          <input
            type="password"
            name="Şifre"
            className="admin-input"
            placeholder="Şifre"
            value={password}
            onChange={handlePasswordChange}
            onKeyDown={handleKeyPress}
          />
          <i className="zmdi zmdi-lock zmdi-hc-lg admin-icon"></i>
        </div>
        <button type="submit" onClick={handleSubmit} className="admin-button">
          Giriş Yap
        </button>
      </div>
    </div>
  );
}
