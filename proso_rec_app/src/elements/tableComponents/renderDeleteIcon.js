import React from "react";

const RenderDeleteIcon = ({
  loginSuccess,
  loginInfo,
  setIndexForToDelete,
  index,
  isEditTesterNamesClicked,
  deleteTesterNameFnLittle,
}) => {
  if (!loginSuccess && loginInfo !== "admin") return null;

  return (
    <td>
      {isEditTesterNamesClicked ? (
        <i
          className="bi bi-x-lg"
          onClick={() => deleteTesterNameFnLittle(index)}
        ></i>
      ) : (
        <i
          className="bi bi-x-lg"
          onClick={() => setIndexForToDelete(index)}
        ></i>
      )}
    </td>
  );
};

export default RenderDeleteIcon;
