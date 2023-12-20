import React from "react";
const getDate = (isoDateString) => {
  const isoDate = new Date(isoDateString);

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZone: "Europe/Istanbul", // Türkiye'nin zaman dilimi
  };
  console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);

  const formattedDate = isoDate.toLocaleString("tr-TR", options);
  return formattedDate;
};
const RenderDateColumn = ({
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
        name="DateColumn"
        type="datetime-local"
        step="1"
        autoComplete="off"
        value={item.DateColumn || ""}
        onChange={(e) => handleEditField(index, "DateColumn", e.target.value)}
      />
    );
  } else {
    return <td> {getDate(item.DateColumn)}</td>;
  }
};

export default RenderDateColumn;
