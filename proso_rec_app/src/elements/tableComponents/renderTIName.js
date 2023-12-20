import React, { useState } from "react";
import { toast } from "react-toastify";
import "./renderTIName.css";
const RenderTIName = ({
  item,
  index,
  handleEditField,
  isAddIconClickedTable,
  loginSuccess,
  loginInfo,
  languageData,
  id,
}) => {
  const listArray = ["IR", "GB", "ACW", "LC", "POWER"];
  const [chosen, setChosen] = useState("Seçiniz");
  if (
    (isAddIconClickedTable && item.classNameEditedIcon === "zmdi zmdi-undo") ||
    (isAddIconClickedTable && loginSuccess && loginInfo === "admin")
  ) {
    return (
      <div className="dropdowna">
        <button
          id={id}
          className="btn btn-secondary dropdown-toggle dropdownMenuButton rendertiname-button"
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {chosen}
        </button>
        <div
          id={"under-" + id}
          className="dropdown-menu testas" // Add the "text-center" class here
          aria-labelledby="dropdownMenuButton"
        >
          {listArray.map((smallItem) => (
            <button
              key={smallItem}
              className="dropdown-item tested-unit-button d-flex justify-content-center"
              onClick={(e) => {
                e.preventDefault();
                handleEditField(index, "TIName", smallItem);
                setChosen(smallItem);
              }}
            >
              {smallItem}
            </button>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <td>
        {" "}
        <i
          className="zmdi zmdi-info-outline"
          style={{
            cursor: "pointer",
          }}
          onClick={() => {
            const tiName = item.TIName.toLowerCase();
            let toastMessage = "";

            switch (tiName) {
              case "ir":
                toastMessage = languageData.ToastIrLabel;
                break;
              case "gb":
                toastMessage = languageData.ToastGbLabel;
                break;
              case "acw":
                toastMessage = languageData.ToastAcwLabel;
                break;
              case "lc":
                toastMessage = languageData.ToastLcLabel;
                break;
              case "power":
                toastMessage = languageData.ToastPowerLabel;
                break;
              default:
                toastMessage = "Info could not be found";
                break;
            }

            toast(toastMessage);
          }}
        ></i>{" "}
        {item.TIName || "-"}
      </td>
    );
  }
};
export default RenderTIName;
