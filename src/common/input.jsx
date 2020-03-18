import React from "react";

const Input = ({ nameId, label, value, onChange, type, errors }) => {
  const classes = "form-control " + (errors ? "is-invalid" : "");
  return (
    <div className="form-group ">
      <label htmlFor={nameId}>{label}</label>
      <input
        onChange={onChange}
        value={value}
        type={type}
        id={nameId}
        name={nameId}
        placeholder={label}
        className={classes}
      />
      <div className="invalid-feedback">{errors}</div>
    </div>
  );
};

export default Input;
