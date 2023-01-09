import React from "react";
import { SORT_ORDER } from "../utils/constants";

const Sort = ({ onSort }) => {
  const handleChange = (e) => {
    onSort(e.target.value);
  };

  return (
    <select className="custom-select" onChange={handleChange}>
      {Object.entries(SORT_ORDER).map(([key, value]) => (
        <option key={key} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

export default Sort;
