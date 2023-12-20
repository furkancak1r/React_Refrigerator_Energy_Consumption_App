import React from "react";

const RenderResultMin = ({
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
        name="ResultMin"
        type="number"
        placeholder="0"
        autoComplete="off"
        value={item.ResultMin !== undefined ? item.ResultMin : ""}
        onChange={(e) => handleEditField(index, "ResultMin", e.target.value)}
      />
    );
  } else {
    return item.ResultMin;
  }
};

export default RenderResultMin;
