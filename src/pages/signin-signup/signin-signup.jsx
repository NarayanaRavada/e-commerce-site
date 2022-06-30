import React from "react";

import "./signin-signup.styles.scss";

import SignIn from "../../components/signin/signin";
import SignUP from "../../components/sign-up/sign-up";

const SignInAndSignUpPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUP />
    </div>
  );
};

export default SignInAndSignUpPage;
