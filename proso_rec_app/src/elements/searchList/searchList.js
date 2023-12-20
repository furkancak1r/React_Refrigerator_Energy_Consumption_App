import React, { useCallback, useState, useEffect } from "react";
import fetchExactMatchSerialNo from "../../api/fetchExactMatchSerialNo";
import "./searchList.css";

export default function SearchList({
  inputValue,
  handleChangeInputValueFromSearchList,
  ishandleInputChangeExecuted,
}) {
  const [dataLike, setDataLike] = useState([]);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [debouncedInputValue, setDebouncedInputValue] = useState(inputValue);

  const fetchAndUpdateDataLike = useCallback(async () => {
    if (debouncedInputValue.length > 1 && toggle) {
      try {
        const result = await fetchExactMatchSerialNo(debouncedInputValue);
        setDataLike(Array.isArray(result) ? result : []);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    } else {
      setDataLike([]);
    }
    // eslint-disable-next-line
  }, [debouncedInputValue]);

  useEffect(() => {
    if (ishandleInputChangeExecuted) {
      setToggle(false);
      setDataLike([]);
    } else {
      setToggle(true);
      fetchAndUpdateDataLike();
    }
    // eslint-disable-next-line
  }, [ishandleInputChangeExecuted, data, debouncedInputValue]);

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedInputValue(inputValue);
    }, 300);

    return () => {
      clearTimeout(debounceTimeout);
    };
  }, [inputValue]);

  const handleItemClick = (item) => {
    handleChangeInputValueFromSearchList(item.SerialNo);
    setToggle(false);
  };

  SearchList.SendDataToSearchList = async (newData) => {
    setData(newData);
    setToggle(false);
  };

  if (dataLike.length > 0 && toggle) {
    return (
      <div className="list-group-container">
        <ul className="list-group">
          {dataLike.map((item, index) => (
            <li
              className="list-group-item"
              key={index}
              onClick={() => handleItemClick(item)}
            >
              {item.SerialNo}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return null;
  }
  
}
