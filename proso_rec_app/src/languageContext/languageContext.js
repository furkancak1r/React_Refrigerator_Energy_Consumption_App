import { createContext, useContext, useState } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const LanguageProvider = ({ children }) => {
  const [languageData, setLanguageData] = useState([]);

  const languageDataFn = (data) => {
    // Your logic for updating language data here
    setLanguageData(data);
  };

  return (
    <LanguageContext.Provider value={{ languageData, languageDataFn }}>
      {children}
    </LanguageContext.Provider>
  );
};
