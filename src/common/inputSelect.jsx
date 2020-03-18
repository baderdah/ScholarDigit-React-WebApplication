import React from "react";

const InputSelect = ({ nameId, label, value, onChange, errors, options }) => {
  const classes = "form-control " + (errors ? "is-invalid" : "");
  return (
    <div className="form-group ">
      <label htmlFor={nameId}>{label}</label>
      <select
        onChange={onChange}
        value={value}
        id={nameId}
        name={nameId}
        placeholder={label}
        className={classes}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <div className="invalid-feedback">{errors}</div>
    </div>
  );
};

export default InputSelect;
