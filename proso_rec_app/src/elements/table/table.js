import React, { useEffect, useState, useCallback } from "react";
import "./table.css";
import fetchDataBySerialNumber from "../../api/fetchData";
import { useAuth } from "../../authContext/authContext";
import deleteRow from "../../api/deleteRow";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmationModal from "../confirmationModal/confirmationModal";
import updateRowFn from "../../api/updateRow";
import fetchColumnNames from "../../api/fetchColumnNames";
import addRowFn from "../../api/addRow";
import SearchElement from "../searchElement/searchElement";
import SearchList from "../searchList/searchList";
import { useLanguage } from "../../languageContext/languageContext";
import ExportExcel from "../exportExcel/exportExcel";
import InputConfirmationModal from "../inputConfirmationModal/inputConfirmationModal";
import evaporatorPanUpdateFn from "../../api/evaporatorPanUpdate";

import RenderForm from "../tableComponents/renderForm";
import fetchTesterNames from "../../api/fetchTesterNames";
import TableBody from "./tableBody";
export default function Table() {
  const [data, setData] = useState([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginSuccess, loginInfo } = useAuth();
  const [indexToDelete, setIndexToDelete] = useState();
  const [editedData, setEditedData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showInputModal, setShowInputModal] = useState(false);
  const [testerName, setTesterName] = useState("");
  const [testerNames, setTesterNames] = useState([]);
  const [visualData, setVisualData] = useState([]);
  const [isAddIconClickedTable, setIsAddIconClickedTable] = useState(false);
  const { languageData } = useLanguage();
  const [isEditTesterNamesClicked, setIsEditTesterNamesClicked] =
    useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleInputClose = () => setShowInputModal(false);
  const handleInputShow = () => setShowInputModal(true);
  const fetchTesterNamesFn = async () => {
    try {
      const response = await fetchTesterNames();
      setTesterNames(response);
    } catch (error) {
      console.error("Error occurred while fetching tester names:", error);
    }
  };
  Table.setIsEditTesterNamesClickedFn = async (clicked) => {
    if (clicked) {
      setIsAddIconClickedTable(false);
      setIsEditTesterNamesClicked(true);
      fetchTesterNamesFn();
    } else {
      setIsEditTesterNamesClicked(false);
      SearchElement.setIsAddIconClickedFn(false);
    }
  };
  Table.setSerialNumberFn = (newSerialNumber) => {
    setSerialNumber(newSerialNumber);
  };
  Table.setIsAddIconClickedFn = async (clicked) => {
    if (clicked) {
      try {
        setIsEditTesterNamesClicked(false);

        let response = await fetchColumnNames();
        let newObj = {};

        response.forEach((column) => {
          let columnName = column.COLUMN_NAME;
          newObj[columnName] = "";
        });

        setData([newObj]);
        setEditedData([newObj]);
        setVisualData([newObj]);
        setIsAddIconClickedTable(true);
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    } else {
      setData([]);
      setEditedData([]);
      setVisualData([]);
      setIsAddIconClickedTable(false);
    }
  };
  Table.isDownloadIconClickedFn = async () => {
    if (
      (!serialNumber || serialNumber.length < 21) &&
      (!data || data.length === 0)
    ) {
      toast.error(languageData.ToastExcelDownloadError);
    } else if (serialNumber && serialNumber.length >= 21 && data) {
      handleInputShow();
      if (loginSuccess && loginInfo === "testtakimi") {
        fetchTesterNamesFn();
      }
    }
  };

  Table.fetchAndUpdateDataFn = async () => {
    fetchAndUpdateData();
  };

  const fetchAndUpdateData = useCallback(async () => {
    setLoading(true);

    if (serialNumber.length > 0) {
      try {
        const result = await fetchDataBySerialNumber(serialNumber);
        if (Array.isArray(result)) {
          setData(result);
          await SearchList.SendDataToSearchList(result);
          await SearchElement.setEvaporatorPanInfoFn(result);
          setEditedData(
            result.map((item) => ({
              ...item,
              isEditedIconDisabled: false,
              isUploadIconDisabled: true,
              classNameEditedIcon: "zmdi zmdi-edit",
            }))
          );
          setIsAddIconClickedTable(false);
          setIsEditTesterNamesClicked(false);
        } else {
          setData([]);
          setEditedData([]);
        }
        setLoading(false); // Gecikme sonrası setLoading'i kapatın
      } catch (error) {
        if (error instanceof SyntaxError) {
          // Syntax hatası varsa burada işleyin
        } else {
          console.error("Veri çekme hatası:", error);
          // Diğer hataları gerektiği gibi işleyin
        }
        setLoading(false); // Hata durumunda da setLoading'i kapatın
      }
    } else {
      setLoading(false); // Eğer serialNumber boşsa setLoading'i kapatın
    }
  }, [serialNumber]);
  useEffect(() => {
    setData([]);
    setEditedData([]);
    fetchAndUpdateData(); // Include the function in the dependency array
  }, [serialNumber, fetchAndUpdateData]);

  useEffect(() => {
    let arrayCopy = JSON.parse(JSON.stringify(editedData));
    setVisualData([...arrayCopy]);
  }, [editedData]);

  const handleRemoveRow = async () => {
    handleClose();
    let Id = data[indexToDelete].IdForRow;
    let response = await deleteRow(Id);
    if (response) {
      toast.success(languageData.ToastDeleteRowSuccess, {
        draggable: false,
      });
      fetchAndUpdateData();
    } else {
      toast.error(languageData.ToastDeleteRowError, {
        draggable: false,
      });
    }
  };
  const setIndexForToDelete = (index) => {
    setIndexToDelete(index);
    handleShow();
  };

  const handleEditField = (index, fieldName, value) => {
    const newData = [...visualData];
    newData[index][fieldName] = value;
    setVisualData(newData);
  };

  const handleUploadRow = async (item) => {
    if (!isAddIconClickedTable && !isEditTesterNamesClicked) {
      const itemOld = data.find(
        (itemOld) => itemOld.IdForRow === item.IdForRow
      );
      const oldSerialNo = itemOld ? itemOld.SerialNo : null;

      let response = await updateRowFn(item, oldSerialNo);

      if (response) {
        toast.success(languageData.ToastUpdateRowSuccess, {
          draggable: false,
        });
        fetchAndUpdateData();
      } else {
        toast.error(languageData.ToastUpdateRowError, {
          draggable: false,
        });
      }
    } else {
      if (item.SerialNo.length < 21) {
        toast.error(languageData.ToastSerialNoError, {
          draggable: false,
        });
        return false;
      }
      let response = await addRowFn(item);
      if (response) {
        toast.success(languageData.ToastAddRowSuccess, {
          draggable: false,
        });
        setSerialNumber(item.SerialNo);
        SearchElement.handleSavedInput(item.SerialNo);
        setIsAddIconClickedTable(false);
      } else {
        toast.error(languageData.ToastAddRowError, {
          draggable: false,
        });
      }
    }
  };

  const handleInputConfirmationModal = async () => {
    if (
      (data.every((item) => item.TesterName) && loginInfo === "testtakimi") ||
      loginInfo === ""
    ) {
      handleInputClose();

      ExportExcel(data, serialNumber, loginInfo);
      toast.success(`${serialNumber} Tablosu başarıyla indirildi!`, {
        position: "top-left",
      });
      return;
    }

    if (
      !data.every((item) => item.TesterName) &&
      loginInfo === "testtakimi" &&
      testerName.length <= 2
    ) {
      toast.error("Lütfen isim soyisim bilgisi seçiniz!");
      return false;
    }

    handleInputClose();
    const value = data[0].EvaporatorPan;

    const areAllTesterNamesFilled = data.every(
      (item) => item.TesterName && item.TesterName.trim() !== ""
    );

    const testerNameNew = testerName || data[0].TesterName;
    let result = "";
    if (serialNumber && testerNameNew && !areAllTesterNamesFilled) {
      result = await evaporatorPanUpdateFn(serialNumber, value, testerNameNew);
      if (result) {
        toast.success(
          `${serialNumber} için testi gerçekleştiren kişi güncellendi!`,
          {
            position: "top-left",
          }
        );

        ExportExcel(data, serialNumber, loginInfo);

        toast.success(`${serialNumber} Tablosu başarıyla indirildi!`, {
          position: "top-left",
        });
        Table.fetchAndUpdateDataFn();
      } else {
        toast.error(
          `${serialNumber} için testi gerçekleştiren kişi güncellenirken hata oluştu!`
        );
      }
    } else if (loginInfo === "admin") {
      ExportExcel(data, serialNumber, loginInfo);
      toast.success(`${serialNumber} Tablosu başarıyla indirildi!`, {
        position: "top-left",
      });
    } else {
      toast.error("Eksik veya hatalı veri!");
    }
  };

  return (
    <div className={"table d-flex flex-column"}>
      {!loading && (data.length > 0 || isEditTesterNamesClicked || isAddIconClickedTable) && (
        <div className="status-header">
          {languageData.StatusHeader + ": " + languageData.Status}
        </div>
      )}
  
      <ConfirmationModal
        show={showModal}
        handleClose={handleClose}
        handleConfirm={handleRemoveRow}
        title="Emin misiniz?"
        message="Seçtiğiniz satır silinecektir onaylıyor musunuz?"
      />
      <InputConfirmationModal
        showInputModal={showInputModal}
        loginInfo={loginInfo}
        data={data}
        handleInputClose={handleInputClose}
        handleInputConfirm={handleInputConfirmationModal}
        testerNameData={testerNames}
        setTesterName={setTesterName}
        title="Onaylıyor musunuz?"
        message={"Tablo excel olarak indirilecektir."}
      />
  
      <RenderForm
        visualData={visualData}
        languageData={languageData}
        isAddIconClickedTable={isAddIconClickedTable}
        handleEditField={handleEditField}
        loginSuccess={loginSuccess}
        loginInfo={loginInfo}
        handleUploadRow={handleUploadRow}
      />
  
      {!loading ? (
        data.length > 0 || isEditTesterNamesClicked || isAddIconClickedTable ? (
          <table className="scaled-table">
            <thead>
              <tr>
                {loginSuccess &&
                  loginInfo === "admin" &&
                  !isAddIconClickedTable && (
                    <>
                      {!isEditTesterNamesClicked && (
                        <th scope="col">{languageData.Save}</th>
                      )}
                      {!isEditTesterNamesClicked && (
                        <th scope="col">{languageData.Edit}</th>
                      )}
                      <th scope="col">{languageData.Delete}</th>
                    </>
                  )}
  
                {!isAddIconClickedTable && (
                  <>
                    {loginSuccess && (
                      <th scope="col">{languageData.TesterName}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.ProductSerialNumber}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.TestedUnit}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.SetValue}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.Limits}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.TestResult}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.TestDuration}</th>
                    )}
                    {!isEditTesterNamesClicked && (
                      <th scope="col">{languageData.TestTime}</th>
                    )}
                    {!isEditTesterNamesClicked &&
                      visualData.every(
                        (item) => item.EvaporatorPan || loginSuccess
                      ) && <th scope="col">{languageData.EvaporatorPan}</th>}
                  </>
                )}
  
                {loginSuccess &&
                  loginInfo === "admin" &&
                  !isAddIconClickedTable &&
                  !isEditTesterNamesClicked && (
                    <th scope="col">{languageData.UploadType}</th>
                  )}
              </tr>
            </thead>
            <tbody>
              <TableBody
                dataForBody={
                  isEditTesterNamesClicked ? testerNames : visualData
                }
                loginInfo={loginInfo}
                loginSuccess={loginSuccess}
                isAddIconClickedTable={isAddIconClickedTable}
                handleUploadRow={handleUploadRow}
                handleEditField={handleEditField}
                setIndexForToDelete={setIndexForToDelete}
                setVisualData={setVisualData}
                editedData={editedData}
                isEditTesterNamesClicked={isEditTesterNamesClicked}
                languageData={languageData}
                visualData={visualData}
              />
            </tbody>
          </table>
        ) : serialNumber ? (
          <div className="loading-message">{languageData.DataNotFound}</div>
        ) : (
          ""
        )
      ) : (
        <div className="loading-message">
          {serialNumber ? languageData.Uploading : ""}
        </div>
      )}
    </div>
  );
  
  
  
};