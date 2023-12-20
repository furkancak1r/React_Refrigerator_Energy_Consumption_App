import React, { useState, useEffect } from "react";
import "./languages.css";
import fetchLanguageFn from "../../api/fetchLanguage";
import { useLanguage } from "../../languageContext/languageContext";
import { useNavigate } from "react-router-dom";

export default function Languages() {
  let localLanguage = localStorage.getItem("languageKey");
  const [selectedLanguage, setSelectedLanguage] = useState(
    localLanguage || "Turkish"
  );
  const { languageDataFn } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedLanguage) {
      fetchLanguageFn(selectedLanguage)
        .then((data) => {
          data && languageDataFn(data[0]);
          if (data === "error") {
            navigate("/internal-error");
          }
        })
        .catch((error) => {
          console.error("Veri alma hatası:", error);
        });
    }
    // eslint-disable-next-line
  }, [selectedLanguage]);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    localStorage.setItem("languageKey", language);
  };

  return (
    <div className="dropdown-language">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Languages
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {["Turkish", "English", "German", "French", "Arabic"].map(
          (language) => (
            <button
              key={language}
              className="dropdown-item"
              onClick={() => handleLanguageChange(language)}
            >
              <img
                src={`images/${language.toLowerCase()}.png`}
                alt={`${language} Flag`}
                className="flag-icon"
              />
              {language}
            </button>
          )
        )}
      </div>
    </div>
  );
}
