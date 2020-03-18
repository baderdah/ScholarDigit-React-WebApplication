import React from "react";
import Joi from "joi-browser";
import Form from "../common/Form";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

console.log("login auth ", auth);

class LoginForm extends Form {
  state = {
    data: { userName: "", password: "" },
    errors: {}
  };

  schema = {
    userName: Joi.string()
      //   .email()
      .required()
      .label("User name"),
    password: Joi.string().required()
  };

  doSubmit = async () => {
    //Call the server

    const { data } = this.state;
    try {
      await auth.login(data.userName, data.password);

      console.log(this);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
      return;
    } catch (ex) {
      if (ex.response) {
        console.log("exeption");
        const errors = { ...this.state.errors };
        errors.userName = ex.response.data;
        console.log(ex.response);

        this.setState({ errors });
      }
    }
  };

  render() {
    if (auth.getCurrentUser()) {
      return <Redirect to="/" />;
    }

    return (
      <div className="col-4 p-5 mt-5 rounded border border-info mx-auto">
        <h2>Login</h2>
        <form onSubmit={this.handelSubmit}>
          {this.renderInput("userName", "User Name")}
          {this.renderInput("password", "Password", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
