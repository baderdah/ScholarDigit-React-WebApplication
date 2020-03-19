import React, { Component } from "react";
// import Joi from "joi-browser";
import Input from "../common/input";
import InputSelect from "../common/inputSelect";
class Form extends Component {
  renderButton = label => {
    return (
      <button disabled={this.props.validateForm()} className="btn btn-primary">
        {label}
      </button>
    );
  };

  renderInput = (name, label, type = "text") => {
    const { data, errors } = this.props;

    return (
      <Input
        nameId={name}
        label={label}
        value={data[name]}
        onChange={this.props.handelChange}
        type={type}
        errors={errors[name]}
      />
    );
  };

  renderInputSelect = (name, label, options) => {
    const { data, errors } = this.props;
    return (
      <InputSelect
        nameId={name}
        label={label}
        value={data[name]}
        onChange={this.props.handelChange}
        errors={errors[name]}
        options={options}
      />
    );
  };
}

export default Form;
