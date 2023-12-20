import React from "react";

const RenderResultValue = ({
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
    return (
      <input
        id={id}
        name="ResultValue"
        type="number"
        placeholder="0"
        autoComplete="off"
        value={item.ResultValue !== undefined ? item.ResultValue : ""}
        onChange={(e) => handleEditField(index, "ResultValue", e.target.value)}
      />
    );
  } else {
    return typeof item.ResultValue === "number"
      ? item.ResultValue.toFixed(2)
      : "";
  }
};

export default RenderResultValue;
