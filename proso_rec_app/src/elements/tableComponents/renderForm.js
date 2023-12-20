// RenderForm.js
import React from "react";
import RenderSerialNo from "../tableComponents/renderSerialNo";
import RenderConditionUnit from "../tableComponents/renderConditionUnit";
import RenderTesterName from "../tableComponents/renderTesterName";
import RenderConditionSet from "../tableComponents/renderConditionSet";
import RenderTIName from "../tableComponents/renderTIName";
import RenderUploadIcon from "../tableComponents/renderUploadIcon";
import RenderResultMin from "../tableComponents/renderResultMin";
import RenderResultMax from "../tableComponents/renderResultMax";
import RenderResultConditionUnit from "../tableComponents/renderResultConditionUnit";
import RenderResultValue from "../tableComponents/renderResultValue";
import RenderResultUnit from "../tableComponents/renderResultUnit";
import RenderTestTimeSet from "../tableComponents/renderTestTimeSet";
import RenderTestTimeUnit from "../tableComponents/renderTestTimeUnit";
import RenderDateColumn from "../tableComponents/renderDateColumn";
import RenderEvaporatorPan from "../tableComponents/renderEvaporatorPan";
const RenderForm = ({
  visualData,
  languageData,
  isAddIconClickedTable,
  handleEditField,
  loginSuccess,
  loginInfo,
  handleUploadRow,
}) => (
  <>
    {isAddIconClickedTable &&
      visualData.map((item, index) => (
        <form key={`form-${index}`}>
          <div className="container">
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderTesterName-${index}`}>
                  {languageData.TesterName}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderTesterName
                  key={`RenderTesterName-${index}`}
                  id={`RenderTesterName-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderSerialNo-${index}`}>
                  {languageData.ProductSerialNumber}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderSerialNo
                  key={`RenderSerialNo-${index}`}
                  id={`RenderSerialNo-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderTIName-${index}`}>
                  {languageData.TestedUnit}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderTIName
                  key={`RenderTIName-${index}`}
                  id={`RenderTIName-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                    languageData,
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderConditionSet-${index}`}>
                  {languageData.SetValue}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderConditionSet
                  key={`RenderConditionSet-${index}`}
                  id={`RenderConditionSet-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderConditionUnit-${index}`}>
                  {languageData &&
                  languageData.Unit &&
                  languageData.Unit.length > 0
                    ? languageData.Unit
                    : ""}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderConditionUnit
                  key={`RenderConditionUnit-${index}`}
                  id={`RenderConditionUnit-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`min-${index}`}>Min</label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderResultMin
                  key={`min-${index}`}
                  id={`min-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`max-${index}`}>Max</label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderResultMax
                  key={`max-${index}`}
                  id={`max-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderResultConditionUnit-${index}`}>
                  {languageData.LimitUnit}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderResultConditionUnit
                  key={`RenderResultConditionUnit-${index}`}
                  id={`RenderResultConditionUnit-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderResultValue-${index}`}>
                  {languageData.ResultValue}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderResultValue
                  key={`RenderResultValue-${index}`}
                  id={`RenderResultValue-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderResultUnit-${index}`}>
                  {languageData.ResultUnit}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderResultUnit
                  key={`RenderResultUnit-${index}`}
                  id={`RenderResultUnit-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderTestTimeSet-${index}`}>
                  {languageData.TestDuration}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderTestTimeSet
                  key={`RenderTestTimeSet-${index}`}
                  id={`RenderTestTimeSet-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderTestTimeUnit-${index}`}>
                  {languageData.TestDurationUnit}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderTestTimeUnit
                  key={`RenderTestTimeUnit-${index}`}
                  id={`RenderTestTimeUnit-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderDateColumn-${index}`}>
                  {languageData.TestTime}{" "}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderDateColumn
                  key={`RenderDateColumn-${index}`}
                  id={`RenderDateColumn-${index}`}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-6 d-flex justify-content-center">
                <label htmlFor={`RenderEvaporatorPan-${index}`}>
                  {languageData.EvaporatorPan}{" "}
                </label>
              </div>
              <div className="col-6 d-flex justify-content-center">
                <RenderEvaporatorPan
                  key={`RenderEvaporatorPan-${index}`}
                  id={`RenderEvaporatorPan-${index}`}
                  visualData={visualData}
                  languageData={languageData}
                  {...{
                    item,
                    index,
                    handleEditField,
                    isAddIconClickedTable,
                    loginSuccess,
                    loginInfo,
                  }}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-12 d-flex justify-content-center">
                <RenderUploadIcon
                  isAddIconClickedTable={isAddIconClickedTable}
                  item={item}
                  loginSuccess={loginSuccess}
                  loginInfo={loginInfo}
                  handleUploadRow={handleUploadRow}
                />
              </div>
            </div>
          </div>
        </form>
      ))}
  </>
);

export default RenderForm;
