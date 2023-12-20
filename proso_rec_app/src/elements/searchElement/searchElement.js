import React, { useState, useEffect } from "react";
import "./searchElement.css";
import Table from "../table/table";
import { useAuth } from "../../authContext/authContext";
import SearchList from "../searchList/searchList";
import { useLanguage } from "../../languageContext/languageContext";
import InputConfirmationModal from "../inputConfirmationModal/inputConfirmationModal";
import evaporatorPanUpdateFn from "../../api/evaporatorPanUpdate";
import { TypeAnimation } from "react-type-animation";
import { toast } from "react-toastify";
import fetchTesterNames from "../../api/fetchTesterNames";

export default function SearchElement() {
  const [isInputActive, setIsInputActive] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { loginSuccess, loginInfo } = useAuth();
  const [addIconClicked, setAddIconClicked] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [isEditTesterNamesClicked, setIsEditTesterNamesClicked] =
    useState(false);

  const handleInputClose = () => setShowInputModal(false);
  const handleInputShow = () => setShowInputModal(true);
  const [ishandleInputChangeExecuted, setIshandleInputChangeExecuted] =
    useState(false);
  const { languageData } = useLanguage();
  const [evaporatorPanInfo, setEvaporatorPanInfo] = useState(0);
  const [testerName, setTesterName] = useState("");
  const [data, setData] = useState([]);
  const [testerNameData, setTesterNameData] = useState([]);

  const handleClickOutside = (e) => {
    const id = e.target.id;
    let value = document.getElementById("inpt_search");

    if (isEditTesterNamesClicked) {
      setIsInputActive(true);
      return;
    }
    if (!value) return;

    value = value.value;

    if (value.length > 0) return;

    if (id === "zmdi-plus-circle-o" || addIconClicked) return;
    if (
      id !== "zmdi-plus-circle-o" &&
      id !== "inpt_search" &&
      id !== "zmdi-download" &&
      id !== "zmdi-edit" &&
      !isTableOrDescendant(e.target, "table")
    ) {
      setIsInputActive(false);
      setInputValue("");
      setAddIconClicked(false);
      Table.setSerialNumberFn("");
    }
  };

  useEffect(() => {
    const trashIcon = document.querySelector(".bi-x-lg");
    const searchIcon = document.querySelector(".zmdi-search");
    const downloadIcon = document.querySelector(".zmdi-download");
    const editIcon = document.querySelector(".zmdi-edit");

    if (downloadIcon) {
      downloadIcon.style.display = isInputActive ? "block" : "none";
    }

    if (editIcon) {
      editIcon.style.display = isInputActive ? "block" : "none";
    }

    if (trashIcon) {
      trashIcon.style.display = isInputActive ? "block" : "none";
    }

    if (searchIcon) {
      searchIcon.style.display = isInputActive ? "block" : "none";
    }

    if (loginSuccess && loginInfo === "admin") {
      const addIcon = document.querySelector(".zmdi-plus-circle-o");
      const editTesterNames = document.querySelector(".zmdi-account-circle");
      editTesterNames.style.display = isInputActive ? "block" : "none";
      addIcon.style.display = isInputActive ? "block" : "none";
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
    // eslint-disable-next-line
  }, [isInputActive, loginSuccess, addIconClicked]);

  useEffect(() => {
    Table.setIsAddIconClickedFn(addIconClicked);
  }, [addIconClicked]);

  function isTableOrDescendant(element, tagName) {
    while (element) {
      if (element.tagName.toLowerCase() === tagName) return true;
      element = element.parentElement;
    }
    return false;
  }

  SearchElement.handleSavedInput = async (newSerialNumber) => {
    setInputValue(newSerialNumber);
  };
  SearchElement.setIsAddIconClickedFn = async (data) => {
    setIsEditTesterNamesClicked(data);
  };

  const handleSearchIcon = () => {
    if (inputValue.length > 7) {
      Table.setSerialNumberFn(inputValue);
      setIshandleInputChangeExecuted(true);
    } else {
      toast.error(languageData.InputControl);
    }
  };

  const handleSearchIconEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchIcon();
      e.preventDefault();
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setIshandleInputChangeExecuted(false);
  };

  const handleRemoveInput = (e) => {
    setInputValue("");
    setIsInputActive(false);
    Table.setSerialNumberFn("");
    setAddIconClicked(false);
    Table.setIsAddIconClickedFn(false);
    Table.setIsEditTesterNamesClickedFn(false);
    setIsEditTesterNamesClicked(false);
  };

  const handleLabelClick = () => {
    if (!isInputActive) {
      setIsInputActive(true);
      document.getElementById("inpt_search").focus();
    }
  };

  const handleIconsEnter = () => {
    const trashIcon = document.querySelector(".bi-x-lg");
    const searchIcon = document.querySelector(".zmdi-search");
    const downloadIcon = document.querySelector(".zmdi-download");
    const editIcon = document.querySelector(".zmdi-edit");

    if (downloadIcon) {
      downloadIcon.style.display = "block";
    }

    if (editIcon) {
      editIcon.style.display = "block";
    }

    if (trashIcon) {
      trashIcon.style.display = "block";
    }

    if (searchIcon) {
      searchIcon.style.display = "block";
    }

    if (loginSuccess && loginInfo === "admin") {
      const addIcon = document.querySelector(".zmdi-plus-circle-o");
      addIcon.style.display = "block";
      const editTesterNames = document.querySelector(".zmdi-account-circle");
      editTesterNames.style.display = "block";
    }
  };

  const handleIconsLeave = () => {
    if (!isInputActive) {
      const trashIcon = document.querySelector(".bi-x-lg");
      const searchIcon = document.querySelector(".zmdi-search");
      const downloadIcon = document.querySelector(".zmdi-download");
      const editIcon = document.querySelector(".zmdi-edit");

      if (editIcon) {
        editIcon.style.display = "none";
      }

      if (downloadIcon) {
        downloadIcon.style.display = "none";
      }

      if (trashIcon) {
        trashIcon.style.display = "none";
      }

      if (searchIcon) {
        searchIcon.style.display = "none";
      }

      if (loginSuccess) {
        const addIcon = document.querySelector(".zmdi-plus-circle-o");
        addIcon.style.display = "none";
      }
      if (loginSuccess && loginInfo === "admin") {
        const editTesterNames = document.querySelector(".zmdi-account-circle");
        editTesterNames.style.display = "none";
      }
    }
  };
  const handleChangeInputValueFromSearchList = (value) => {
    setInputValue(value);
    Table.setSerialNumberFn(value);
    setIshandleInputChangeExecuted(true);
  };

  const deleteIcon = () => {
    return (
      <i
        className="bi bi-x-lg"
        style={{
          display: "none",
          maxWidth: "16px",
          cursor: "pointer",
          position: "absolute",
          top: "2px",
          right: "8px",
        }}
        onClick={handleRemoveInput}
      ></i>
    );
  };
  const addRow = () => {
    if (!loginSuccess && loginInfo !== "admin") return null;

    return (
      <i
        title="Satır Ekle"
        id="zmdi-plus-circle-o"
        className="zmdi zmdi-plus-circle-o zmdi-hc-2x"
        onClick={() => {
          setAddIconClicked(true);
          Table.setIsAddIconClickedFn(true);
          setIshandleInputChangeExecuted(true);
        }}
      ></i>
    );
  };
  const editTesterName = () => {
    if (!loginSuccess && loginInfo !== "admin") return null;

    return (
      <i
        className="zmdi zmdi-account-circle zmdi-hc-2x"
        style={{
          display: "none",
          maxWidth: "16px",
          cursor: "pointer",
          position: "absolute",
          top: "-2px",
          right: "-160px",
        }}
        onClick={() => {
          Table.setIsEditTesterNamesClickedFn(true);
          setIsEditTesterNamesClicked(true);
        }}
      ></i>
    );
  };
  const searchIcon = () => {
    return (
      <i
        id="zmdi-search"
        className="zmdi zmdi-search zmdi-hc-2x"
        style={{
          display: "none",
          position: "absolute",
          top: "-2px",
          right: "-35px",
          cursor: "pointer",
        }}
        onClick={handleSearchIcon}
      ></i>
    );
  };
  const input = () => {
    return (
      <input
        id="inpt_search"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleSearchIconEnter}
        autoComplete="off"
        maxLength={35}
      />
    );
  };
  const definition = () => {
    const text =
      languageData && languageData.Header ? languageData.Header : null;
    if (!text) return null;
    const stringedText = text.toString();
    return (
      <div className={`definition col-12 ${isInputActive ? "" : "works"}`}>
        <TypeAnimation
          key={stringedText}
          sequence={[stringedText, 1000]}
          wrapper="span"
          speed={50}
          style={{ fontSize: "1.2em", display: "inline-block" }}
          repeat={Infinity}
        />
      </div>
    );
  };

  const downloadIcon = () => {
    return (
      <i
        id="zmdi-download"
        title="Excel Download"
        className="zmdi zmdi-download zmdi-hc-2x"
        style={{
          display: "none",
          position: "absolute",
          top: "-0.5px",
          ...(loginSuccess && loginInfo === "admin"
            ? { right: "-135px" }
            : loginSuccess && loginInfo === "testtakimi"
            ? { right: "-105px" }
            : { right: "-65px" }),
          cursor: "pointer",
        }}
        onClick={() => {
          Table.isDownloadIconClickedFn();
        }}
      ></i>
    );
  };
  const editEvaporatorPanIcon = () => {
    if (!loginSuccess) return null;
    return (
      <i
        id="zmdi-edit"
        title="Buharlaştırma Kabı Düzenle"
        className="zmdi zmdi-edit zmdi-hc-2x"
        style={{
          display: "none",
          position: "absolute",
          top: "-0.5px",
          ...(loginInfo === "testtakimi"
            ? { right: "-75px" }
            : { right: "-105px" }),
          cursor: "pointer",
        }}
        onClick={() => {
          if (inputValue.length >= 21) {
            handleInputShow();
          } else {
            toast.error("Seri No Giriniz!");
          }
        }}
      ></i>
    );
  };
  SearchElement.setEvaporatorPanInfoFn = async (incomingData) => {
    if (incomingData) {
      setData(incomingData);
    }
    if (incomingData && incomingData[0] && incomingData[0].EvaporatorPan) {
      setEvaporatorPanInfo(incomingData[0].EvaporatorPan);
    }
  };

  useEffect(() => {
    if (loginInfo !== "testtakimi" || !showInputModal) {
      return;
    }
    if (Array.isArray(testerNameData) && testerNameData.length > 0) {
      return;
    }
    async function fetchTesterData() {
      const dataNames = await fetchTesterNames();
      setTesterNameData(dataNames);
    }

    fetchTesterData();
    // eslint-disable-next-line
  }, [showInputModal]);

  const handleEditEvaporatorPanIcon = async () => {
    if (
      !data.every((item) => item && item.TesterName) &&
      loginInfo === "testtakimi" &&
      testerName.length <= 2
    ) {
      toast.error("Lütfen isim soyisim bilgisi seçiniz!");
      return false;
    }

    let testerNameNew = (data[0] && data[0].TesterName) || testerName;
    handleInputClose();
    const value = evaporatorPanInfo ? 0 : 1;

    if (testerNameNew || loginInfo === "admin") {
      const result = await evaporatorPanUpdateFn(
        inputValue,
        value,
        testerNameNew
      );

      if (result) {
        toast.success(
          `${inputValue} buharlaştırma kabı başarıyla güncellendi!`
        );
        if (
          loginSuccess &&
          loginInfo === "testtakimi" &&
          testerName !== data[0].TesterName
        ) {
          toast.success("Testi gerçekleştiren kişi bilgisi güncellendi!");
        }
        Table.fetchAndUpdateDataFn();
        setEvaporatorPanInfo(value);
      }
    } else {
      handleInputClose();
      toast.error(
        `${inputValue} buharlaştırma kabı güncellenirken hata meydana geldi!`
      );
    }
  };

  return (
    <div
      className={`cntr ${
        isInputActive ? "isInputActive" : ""
      } d-flex justify-content-center`}
    >
      <InputConfirmationModal
        showInputModal={showInputModal}
        loginInfo={loginInfo}
        data={data}
        handleInputClose={handleInputClose}
        handleInputConfirm={handleEditEvaporatorPanIcon}
        setTesterName={setTesterName}
        testerNameData={testerNameData}
        title="Onaylıyor musunuz?"
        message={
          evaporatorPanInfo === 0
            ? `${inputValue}'ye ait buharlaştırma kabı kontrol edildi olarak işaretlenecektir.`
            : evaporatorPanInfo === 1
            ? `${inputValue}'ye ait buharlaştırma kabı kontrol edilmedi olarak işaretlenecektir.`
            : `${inputValue}'ye ait buharlaştırma kabı kontrol edildi olarak işaretlenecektir.`
        }
      />
      <div className={"cntr-innr container"}>
        <div className="row d-flex justify-content-center align-items-start">
          <label
            className={`search ${
              loginSuccess && loginInfo === "testtakimi" ? "translateX-22" : ""
            } col-12 ${isInputActive ? "active" : ""} ${
              loginSuccess && loginInfo === "admin"
                ? "loginSuccess adminLoginMobil"
                : ""
            }`}
            htmlFor="inpt_search"
            onClick={handleLabelClick}
            onMouseEnter={handleIconsEnter}
            onMouseLeave={handleIconsLeave}
          >
            {input()}
            {deleteIcon()}
            {searchIcon()}
            {addRow()}
            {editEvaporatorPanIcon()}
            {downloadIcon()}
            {editTesterName()}
            <SearchList
              inputValue={inputValue}
              handleChangeInputValueFromSearchList={
                handleChangeInputValueFromSearchList
              }
              ishandleInputChangeExecuted={ishandleInputChangeExecuted}
            />
          </label>
        </div>
        <div className="row">{definition()}</div>
      </div>
    </div>
  );
}
