import React from "react";

const RenderConditionUnit = ({
  item,
  index,
  handleEditField,
  isAddIconClickedTable,
  loginSuccess,
  loginInfo,
  languageData,
  id,
}) => {
  if (
    (isAddIconClickedTable && item.classNameEditedIcon === "zmdi zmdi-undo") ||
    (isAddIconClickedTable && loginSuccess && loginInfo === "admin")
  ) {
    let resultUnit = "-";

    switch (
      item?.TIName // Use optional chaining to handle undefined item.TIName
    ) {
      case "GB":
        resultUnit = "A";
        break;
      case "IR":
      case "ACW":
      case "LC":
      case "POWER":
        resultUnit = "V";
        break;
      default:
        break;
    }
    return (
      <input
        id={id}
        name={languageData?.Unit} // Use optional chaining to handle undefined languageData.Unit
        type="text"
        autoComplete="off"
        value={resultUnit}
        onChange={() => handleEditField(index, "ConditionUnit", resultUnit)}
      />
    );
  } else {
    return item?.ConditionUnit || "-"; // Use optional chaining to handle undefined item.ConditionUnit
  }
};

export default RenderConditionUnit;
