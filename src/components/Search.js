import React, { useState } from "react";
import Button from "./Button";

const Search = ({ onSearch }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(text);
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex">
        <div className="w-100 pr-2">
          <input
            className="form-control mr-2"
            placeholder="Search"
            value={text}
            onChange={handleChange}
          />
        </div>
        <div className="flex-shrink-1">
          <Button className="btn-primary">Search</Button>
        </div>
      </div>
    </form>
  );
};

export default Search;
