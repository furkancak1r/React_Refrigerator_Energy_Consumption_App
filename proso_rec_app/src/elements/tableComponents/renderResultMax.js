import React from "react";

const RenderResultMax = ({
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
        name="ResultMax"
        type="number"
        placeholder="200"
        autoComplete="off"
        value={item.ResultMax !== undefined ? item.ResultMax : ""}
        onChange={(e) => handleEditField(index, "ResultMax", e.target.value)}
      />
    );
  } else {
    return item.ResultMax;
  }
};

export default RenderResultMax;
