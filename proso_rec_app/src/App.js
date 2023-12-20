import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import { Navigate, BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/home";
import AdminLogin from "./components/adminLogin/adminLogin";
import { AuthProvider } from "./authContext/authContext";
import NotFound from "./components/notFound/notFound";
import { ToastContainer } from "react-toastify";
import { LanguageProvider } from "./languageContext/languageContext";
import HandleServerError from "./components/handleServerError/handleServerError";
export default function App() {
  return (
    <div className="App">
      <LanguageProvider>
        <ToastContainer />
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/admin-login" exact element={<AdminLogin />} />
              <Route path="/not-found" exact element={<NotFound />} />
              <Route
                path="/internal-error"
                exact
                element={<HandleServerError />}
              />
              <Route path="*" element={<Navigate to="/not-found" />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </LanguageProvider>
    </div>
  );
}
