import React from "react";

export default function RenderSerialNo({
  item,
  index,
  handleEditField,
  isAddIconClickedTable,
  loginSuccess,
  loginInfo,
  id,
}) {
  if (
    item.classNameEditedIcon === "zmdi zmdi-undo" ||
    (isAddIconClickedTable && loginSuccess && loginInfo === "admin")
  ) {
    return isAddIconClickedTable ? (
      <input
        id={id}
        name="SerialNo"
        placeholder="SS200242_76099_000001"
        type="text"
        autoComplete="off"
        value={
          (item.SerialNo && item.SerialNo.replace(/\s/g, "").toUpperCase()) ||
          ""
        }
        onChange={(e) =>
          handleEditField(
            index,
            "SerialNo",
            e.target.value.replace(/\s/g, "").toUpperCase() || ""
          )
        }
        onKeyDown={(e) => {
          if (e.target.value && e.target.value.length > 20) {
            e.target.style.width = e.target.value.length + 1 + "ch"; // +1, kenarlık genişliği ekler
          }
        }}
      />
    ) : (
      <td>
        <input
          id={id}
          name="SerialNo"
          placeholder="SS200242_76099_000001"
          type="text"
          autoComplete="off"
          value={
            (item.SerialNo && item.SerialNo.replace(/\s/g, "").toUpperCase()) ||
            ""
          }
          onChange={(e) =>
            handleEditField(
              index,
              "SerialNo",
              e.target.value.replace(/\s/g, "").toUpperCase() || ""
            )
          }
          onKeyDown={(e) => {
            if (e.target.value && e.target.value.length > 20) {
              e.target.style.width = e.target.value.length + 1 + "ch"; // +1, kenarlık genişliği ekler
            }
          }}
        />
      </td>
    );
  } else {
    return <td>{item.SerialNo}</td>;
  }
}
