import React from "react";

const SearchBar = ({ onChange, searchedText }) => {
  return (
    <input
      onChange={onChange}
      value={searchedText}
      type="text"
      placeholder="search"
      className="form-control"
    />
  );
};

export default SearchBar;
