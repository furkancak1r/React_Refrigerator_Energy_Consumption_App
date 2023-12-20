import React from 'react';

const RenderUploadIcon = ({ item, loginSuccess, loginInfo, handleUploadRow ,isAddIconClickedTable}) => {
  if (!loginSuccess && loginInfo !== "admin") return null;

  const iconStyle = {
    cursor: item.isUploadIconDisabled ? "not-allowed" : "pointer",
    color: item.isUploadIconDisabled ? "gray" : "whitesmoke",
    ...(isAddIconClickedTable && {
      minWidth: "21ch",
      width: "21ch",
      height: "5ch",
      border: "1px solid #F5F5F5",
      borderRadius: "10px",
    }),
  };
  

  return (    <i
    className={`zmdi zmdi-upload ${isAddIconClickedTable ? 'd-flex justify-content-center align-items-center' : ''}`}
    style={iconStyle}
      onClick={() => {
        if (!item.isUploadIconDisabled) {
          handleUploadRow(item);
        }
      }}
    ></i>
  );
};

export default RenderUploadIcon;
