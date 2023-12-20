import React from "react";

const RenderEvaporatorPan = ({
  item,
  index,
  handleEditField,
  isAddIconClickedTable,
  loginSuccess,
  loginInfo,
  visualData,
  languageData,
  id,
}) => {
  if (
    (isAddIconClickedTable && item.classNameEditedIcon === "zmdi zmdi-undo") ||
    (isAddIconClickedTable && loginSuccess && loginInfo === "admin")
  ) {
    return (
      <input
        id={id}
        name="EvaporatorPan"
        type="number"
        placeholder="1"
        autoComplete="off"
        value={
          item.EvaporatorPan === 1 || item.EvaporatorPan === 0
            ? item.EvaporatorPan
            : ""
        }
        onChange={(e) => {
          const newValue = parseInt(e.target.value, 10);
          if (!isNaN(newValue) && (newValue === 0 || newValue === 1)) {
            handleEditField(index, "EvaporatorPan", newValue);
          }
        }}
      />
    );
  } else {
    return (
      <>
        {(visualData.every((item) => item.EvaporatorPan) || loginSuccess) && (
          <td>
            {item.EvaporatorPan === 0
              ? languageData.EvaporatorPanError
              : item.EvaporatorPan === 1
              ? languageData.EvaporatorPanSuccess
              : ""}
          </td>
        )}
      </>
    );
  }
};

export default RenderEvaporatorPan;
