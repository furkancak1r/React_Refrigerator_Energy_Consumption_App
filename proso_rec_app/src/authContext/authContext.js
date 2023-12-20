// AuthContext.js
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loginInfo, setloginInfo] = useState("");

  const login = () => {
    setLoginSuccess(true);
  };

  const logout = () => {
    setLoginSuccess(false);
    setloginInfo("");

  };

  const setLoginInfoFn = (newLoginInfo) => {
    setloginInfo(newLoginInfo);
  };
  return (
    <AuthContext.Provider value={{ loginSuccess, loginInfo, login, logout,setLoginInfoFn }}>
      {children}
    </AuthContext.Provider>
  );
};