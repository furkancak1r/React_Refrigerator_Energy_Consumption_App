import React from "react";

const RenderResultUnit = ({
  item,
  index,
  handleEditField,
  isAddIconClickedTable,
  loginSuccess,
  loginInfo,
  id,
}) => {
  if (
    (isAddIconClickedTable && item.classNameEditedIcon === "zmdi zmdi-undo") ||
    (isAddIconClickedTable && loginSuccess && loginInfo === "admin")
  ) {
    let resultUnit = "-";

    switch (item.TIName) {
      case "GB":
        resultUnit = "Mohm";
        break;
      case "IR":
        resultUnit = "Mohm";
        break;
      case "ACW":
        resultUnit = "mA";
        break;
      case "LC":
        resultUnit = "uA";
        break;
      case "POWER":
        resultUnit = "W";
        break;
      default:
        break;
    }

    return (
      <input
        id={id}
        name="ResultUnit"
        type="text"
        placeholder="Mohm"
        autoComplete="off"
        value={resultUnit}
        onChange={(e) => handleEditField(index, "ResultUnit", resultUnit)}
      />
    );
  } else {
    return item.ResultUnit;
  }
};

export default RenderResultUnit;
