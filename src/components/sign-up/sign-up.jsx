import React, { Component } from "react";
import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";

import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";
import { createUserWithEmailAndPassword } from "firebase/auth";

import "./sign-up.styles.scss";

class SignUP extends Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { displayName, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      user.displayName = displayName;
      await createUserProfileDocument(user);

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log("error creating user", error);
    }
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;

    return (
      <div className="sign-up">
        <h2 className="title">I dont have an account</h2>
        <span>Sign up with your email and password</span>
        <form className="sign-up-form" onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            label="Display Name"
            value={displayName}
            onChange={this.handleChange}
            required
          ></FormInput>
          <FormInput
            name="email"
            label="Email"
            value={email}
            onChange={this.handleChange}
            type="email"
            required
          ></FormInput>
          <FormInput
            name="password"
            label="Password"
            value={password}
            onChange={this.handleChange}
            type="password"
            required
          ></FormInput>
          <FormInput
            name="confirmPassword"
            label="Confirm Password"
            value={confirmPassword}
            onChange={this.handleChange}
            type="password"
            required
          ></FormInput>
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUP;
