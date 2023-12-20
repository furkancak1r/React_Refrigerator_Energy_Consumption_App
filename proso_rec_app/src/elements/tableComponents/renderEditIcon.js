import React from "react";

const RenderEditIcon = ({
  item,
  loginSuccess,
  loginInfo,
  index,
  visualData,
  setVisualData,
  editedData,
}) => {
  if (!loginSuccess && loginInfo !== "admin") return null;
  return (
    <td>
    <i
      className={item.classNameEditedIcon}
      style={{
        cursor: item.isEditedIconDisabled ? "not-allowed" : "pointer",
        color: item.isEditedIconDisabled ? "gray" : "whitesmoke",
      }}
      onClick={() => {
        if (!item.isEditedIconDisabled) {
          item.isUploadIconDisabled = !item.isUploadIconDisabled;
          if (item.classNameEditedIcon === "zmdi zmdi-edit") {
            item.classNameEditedIcon = "zmdi zmdi-undo";
            const temp = [...visualData];
            visualData.forEach((e, i) => {
              if (i !== index) {
                temp[i].isEditedIconDisabled = !temp[i].isEditedIconDisabled;
                temp[i].classNameEditedIcon = "zmdi zmdi-edit";
              }
            });
            setVisualData([...temp]);
          } else {
            item.classNameEditedIcon = "zmdi zmdi-edit";
            let arrayCopy = JSON.parse(JSON.stringify(editedData));
            setVisualData([...arrayCopy]);
          }
        }
      }}
    ></i></td>
  );
};

export default RenderEditIcon;
