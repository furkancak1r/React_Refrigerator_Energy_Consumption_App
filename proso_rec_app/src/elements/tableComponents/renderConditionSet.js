import React from "react";

const RenderConditionSet = ({
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
        name="ConditionSet"
        placeholder="25"
        type="number"
        autoComplete="off"
        value={item.ConditionSet !== undefined ? item.ConditionSet : ""}
        onChange={(e) => handleEditField(index, "ConditionSet", e.target.value)}
        onKeyDown={(e) => {
          if (e.target.value && e.target.value.length > 10) {
            e.target.style.width = e.target.value.length + "ch";
          }
        }}
      />
    );
  } else {
    return item.ConditionSet || "-";
  }
};

export default RenderConditionSet;
