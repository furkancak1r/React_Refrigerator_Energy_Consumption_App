import React from "react";

const RenderTestTimeUnit = ({
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
        name="TestTimeUnit"
        type="text"
        autoComplete="off"
        value={"s"}
        onChange={(e) => handleEditField(index, "TestTimeUnit", "s")}
      />
    );
  } else {
    return item.TestTimeUnit;
  }
};

export default RenderTestTimeUnit;
