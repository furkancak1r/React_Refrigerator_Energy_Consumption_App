import React from "react";

const RenderTestTimeSet = ({
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
        name="TestTimeSet"
        type="number"
        placeholder="2"
        autoComplete="off"
        value={item.TestTimeSet !== undefined ? item.TestTimeSet : ""}
        onChange={(e) => handleEditField(index, "TestTimeSet", e.target.value)}
      />
    );
  } else {
    return item.TestTimeSet;
  }
};

export default RenderTestTimeSet;
