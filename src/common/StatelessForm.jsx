import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "../common/input";
import InputSelect from "../common/inputSelect";
class Form extends Component {
  // state = {
  //   data: {},
  //   errors: {}
  // };

  // validateForm = () => {
  //   const result = Joi.validate(this.state.data, this.schema, {
  //     abortEarly: false
  //   });
  //   if (!result.error) return null;

  //   const errors = {};
  //   result.error.details.forEach(item => {
  //     errors[item.path[0]] = item.message;
  //   });
  //   return errors;
  // };

  // validateProperty = input => {
  //   const obj = { [input.name]: input.value };
  //   const schema = { [input.name]: this.schema[input.name] };
  //   const { error } = Joi.validate(obj, schema);
  //   return error ? error.details[0].message : null;
  // };
  // handelSubmit = e => {
  //   e.preventDefault();

  //   const errors = this.validateForm();
  //   this.setState({ errors: errors || {} });
  //   if (errors) return;

  //   this.doSubmit();
  // };

  // handelChange = ({ currentTarget: input }) => {
  //   const errors = { ...this.state.errors };
  //   const errorMessage = this.validateProperty(input);
  //   if (errorMessage) {
  //     errors[input.name] = errorMessage;
  //   } else delete errors[input.name];

  //   this.setState({ errors: errors || {} });
  //   const data = { ...this.state.data };
  //   data[input.name] = input.value;
  //   this.setState({
  //     data,
  //     errors
  //   });
  // };

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
