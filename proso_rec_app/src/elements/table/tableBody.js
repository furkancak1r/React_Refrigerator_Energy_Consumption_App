import React, { useState } from "react";
import RenderSerialNo from "../tableComponents/renderSerialNo";
import RenderConditionUnit from "../tableComponents/renderConditionUnit";
import RenderTesterName from "../tableComponents/renderTesterName";
import RenderConditionSet from "../tableComponents/renderConditionSet";
import RenderTIName from "../tableComponents/renderTIName";
import RenderUploadIcon from "../tableComponents/renderUploadIcon";
import RenderDeleteIcon from "../tableComponents/renderDeleteIcon";
import RenderEditIcon from "../tableComponents/renderEditIcon";
import RenderResultMin from "../tableComponents/renderResultMin";
import RenderResultMax from "../tableComponents/renderResultMax";
import RenderResultConditionUnit from "../tableComponents/renderResultConditionUnit";
import RenderResultValue from "../tableComponents/renderResultValue";
import RenderResultUnit from "../tableComponents/renderResultUnit";
import RenderTestTimeSet from "../tableComponents/renderTestTimeSet";
import RenderTestTimeUnit from "../tableComponents/renderTestTimeUnit";
import RenderDateColumn from "../tableComponents/renderDateColumn";
import RenderEvaporatorPan from "../tableComponents/renderEvaporatorPan";
import { toast } from "react-toastify";
import addNewTesterNameFn from "../../api/addNewTesterName";
import Table from "./table";
import deleteTesterNameFn from "../../api/deleteTesterName";
export default function TableBody({
  dataForBody,
  loginInfo,
  loginSuccess,
  isAddIconClickedTable,
  handleUploadRow,
  handleEditField,
  setIndexForToDelete,
  visualData,
  setVisualData,
  editedData,
  isEditTesterNamesClicked,
  languageData,
}) {
  const [isAddClicked, setIsAddClicked] = useState(false);
  const [testerNameValue, setTesterNameValue] = useState("");

  const handleAddClick = () => {
    setIsAddClicked(true);
  };
  const deleteTesterNameFnLittle = async (index) => {
    const response = await deleteTesterNameFn(dataForBody[index].TesterName);
    if (response) {
      toast.success("Kişi Silindi!");
      Table.setIsEditTesterNamesClickedFn(true);
      setIsAddClicked(false);
    } else {
      toast.error("Kişi Silinirken Hata Meydana Geldi!");
      setIsAddClicked(false);
    }
  };
  const handleUploadNewTesterName = async () => {
    if (testerNameValue.length <= 2) {
      toast.error("İsim Soyisim Giriniz!");
      return;
    }
    const response = await addNewTesterNameFn(testerNameValue);
    if (response) {
      toast.success("Yeni Kişi Eklendi!");
      setIsAddClicked(false);
      Table.setIsEditTesterNamesClickedFn(true);
    } else {
      toast.error("Kişi Eklenirken Hata Meydana Geldi!");
      setIsAddClicked(false);
    }
  };
  const handleNewTesterNameInputChange = async (e) => {
    setTesterNameValue(e.target.value.toUpperCase());
  };
  return (
    <>
      {Array.isArray(dataForBody) ? (
        dataForBody.map((item, index) => (
          <tr
            key={index}
            // style={{
            //   color:
            //     item.ResultValue < item.ResultMin ||
            //     item.ResultValue > item.ResultMax
            //       ? "red"
            //       : "whitesmoke",
            // }}
            //SS201118_75005_000001
          >
            {loginSuccess &&
              loginInfo === "admin" &&
              !isAddIconClickedTable &&
              !isEditTesterNamesClicked && (
                <td>
                  <RenderUploadIcon
                    item={item}
                    loginSuccess={loginSuccess}
                    loginInfo={loginInfo}
                    handleUploadRow={handleUploadRow}
                  />
                </td>
              )}
            {loginSuccess &&
              loginInfo === "admin" &&
              !isAddIconClickedTable && (
                <>
                  {!isEditTesterNamesClicked && (
                    <RenderEditIcon
                      item={item}
                      loginSuccess={loginSuccess}
                      loginInfo={loginInfo}
                      index={index}
                      visualData={visualData}
                      setVisualData={setVisualData}
                      editedData={editedData}
                      isEditTesterNamesClicked={isEditTesterNamesClicked}
                    />
                  )}
                  <RenderDeleteIcon
                    loginSuccess={loginSuccess}
                    loginInfo={loginInfo}
                    setIndexForToDelete={setIndexForToDelete}
                    index={index}
                    isEditTesterNamesClicked={isEditTesterNamesClicked}
                    deleteTesterNameFnLittle={deleteTesterNameFnLittle}
                  />
                </>
              )}

            {!isAddIconClickedTable && (
              <RenderTesterName
                item={item}
                index={index}
                handleEditField={handleEditField}
                isAddIconClickedTable={isAddIconClickedTable}
                loginSuccess={loginSuccess}
                loginInfo={loginInfo}
              />
            )}
            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <RenderSerialNo
                key={index}
                item={item}
                index={index}
                handleEditField={handleEditField}
                isAddIconClickedTable={isAddIconClickedTable}
                loginSuccess={loginSuccess}
                loginInfo={loginInfo}
              />
            )}
            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <RenderTIName
                item={item}
                index={index}
                handleEditField={handleEditField}
                isAddIconClickedTable={isAddIconClickedTable}
                loginSuccess={loginSuccess}
                loginInfo={loginInfo}
                languageData={languageData}
              />
            )}
            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <td>
                <RenderConditionSet
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
                <RenderConditionUnit
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                  languageData={languageData}
                />
              </td>
            )}

            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <td>
                <RenderResultMin
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
                ~
                <RenderResultMax
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
                <RenderResultConditionUnit
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
              </td>
            )}

            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <td>
                <RenderResultValue
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
                <RenderResultUnit
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
              </td>
            )}

            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <td>
                <RenderTestTimeSet
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
                <RenderTestTimeUnit
                  item={item}
                  index={index}
                  handleEditField={handleEditField}
                  isAddIconClickedTable={isAddIconClickedTable}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                />
              </td>
            )}

            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <RenderDateColumn
                item={item}
                index={index}
                handleEditField={handleEditField}
                isAddIconClickedTable={isAddIconClickedTable}
                loginSuccess={loginSuccess}
                loginInfo={loginInfo}
              />
            )}
            {!isAddIconClickedTable && !isEditTesterNamesClicked && (
              <RenderEvaporatorPan
                item={item}
                index={index}
                handleEditField={handleEditField}
                isAddIconClickedTable={isAddIconClickedTable}
                loginSuccess={loginSuccess}
                loginInfo={loginInfo}
                languageData={languageData}
                visualData={visualData}
              />
            )}
            {loginSuccess &&
              loginInfo === "admin" &&
              !isAddIconClickedTable &&
              !isEditTesterNamesClicked && <td>{item.UploadType}</td>}
          </tr>
        ))
      ) : (
        // Handle the case when dataForBody is not an array
        <p>Hata Meydana Geldi</p>
      )}

      {loginSuccess &&
        loginInfo === "admin" &&
        !isAddIconClickedTable &&
        isEditTesterNamesClicked && (
          <>
            <tr>
              <td rowSpan={2} colSpan={2} onClick={handleAddClick}>
                {!isAddClicked ? (
                  <button className="newTesterPersonButton">
                    Yeni Kişi Ekle
                  </button>
                ) : (
                  <>
                    <input
                      name="TesterName"
                      type="text"
                      placeholder="İSİM SOYİSİM"
                      value={testerNameValue}
                      onChange={handleNewTesterNameInputChange}
                    />
                    <i
                      className="zmdi zmdi-upload zmdi-hc-lg"
                      onClick={handleUploadNewTesterName}
                    ></i>
                  </>
                )}
              </td>
            </tr>
          </>
        )}
    </>
  );
}
