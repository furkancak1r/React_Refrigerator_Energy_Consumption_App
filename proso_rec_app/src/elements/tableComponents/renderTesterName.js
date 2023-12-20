import React from "react";

const RenderTesterName = ({
  item,
  index,
  handleEditField,
  isAddIconClickedTable,
  loginSuccess,
  loginInfo,
  id
}) => {
  if (
    item.classNameEditedIcon === "zmdi zmdi-undo" ||
    (isAddIconClickedTable && loginSuccess && loginInfo === "admin")
  ) {
    return (
      isAddIconClickedTable ? (
        <input
          id={id}
          name="TesterName"
          type="text"
          placeholder="FUAT"
          autoComplete="off"
          value={(item.TesterName && item.TesterName.toUpperCase()) || ""}
          onChange={(e) =>
            handleEditField(
              index,
              "TesterName",
              (e.target.value && e.target.value.toUpperCase()) || ""
            )
          }
          onKeyDown={(e) => {
            if (e.target.value && e.target.value.length > 20) {
              e.target.style.width = e.target.value.length + "ch";
            }
          }}
        />
      ) : (
        <td>
          <input
            id={id}
            name="TesterName"
            type="text"
            placeholder="FUAT"
            autoComplete="off"
            value={(item.TesterName && item.TesterName.toUpperCase()) || ""}
            onChange={(e) =>
              handleEditField(
                index,
                "TesterName",
                (e.target.value && e.target.value.toUpperCase()) || ""
              )
            }
            onKeyDown={(e) => {
              if (e.target.value && e.target.value.length > 20) {
                e.target.style.width = e.target.value.length + "ch";
              }
            }}
          />
        </td>
      )
    );
  } else if (loginSuccess) {
    return <td>{item.TesterName || "-"}</td>;
  }
  return null;
};

export default RenderTesterName;
