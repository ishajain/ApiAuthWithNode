import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";
import * as actions from "../actions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GOOGLE_ClIENT_ID, FACEBOOK_APP_ID } from "../keys";

class SignIn extends React.Component {
  responseFromGoogle = async data => {
    //console.log(data);
    await this.props.signInWithGoogle(data);
    this.props.reset("SignIn");
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  };
  responseFromFacebook = async data => {
    console.log(data);
    await this.props.signInWithFacebook(data);
    this.props.reset("SignIn");
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  };

  onFormSubmit = async formValues => {
    await this.props.signIn(formValues);
    this.props.reset("SignIn");
    if (!this.props.errorMessage) {
      this.props.history.push("/dashboard");
    }
  };
  renderInput = ({ input, type, placeholder, meta }) => {
    return (
      <div>
        <input
          {...input}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          className="form-control"
        />
        {this.renderErrorMessage(meta)}
      </div>
    );
  };
  renderErrorMessage = ({ error, touched }) => {
    if (error && touched) {
      return <label> {error}</label>;
    }
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <>
        <form onSubmit={handleSubmit(this.onFormSubmit)}>
          <fieldset>
            <legend>Sign Up</legend>
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <Field
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    component={this.renderInput}
                  />
                </div>
                <div className="form-group">
                  <Field
                    name="password"
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    component={this.renderInput}
                  />
                </div>
                {this.props.errorMessage && (
                  <div className="alert alert-danger">
                    {this.props.errorMessage}
                  </div>
                )}

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
              <div className="col">
                <div className="text-center">
                  <div className="alert alert-secondary">
                    Or sign up using third party services
                  </div>
                  <GoogleLogin
                    clientId={GOOGLE_ClIENT_ID}
                    buttonText="Google"
                    className="btn btn-danger"
                    onFailure={this.responseFromGoogle}
                    onSuccess={this.responseFromGoogle}
                  />
                  <FacebookLogin
                    appId={FACEBOOK_APP_ID}
                    textButton="Facebook"
                    callback={this.responseFromFacebook}
                    fields="name,email,picture"
                    cssClass="btn btn-outline-primary"
                  />
                </div>
              </div>
            </div>
          </fieldset>
        </form>
      </>
    );
  }
}

const validate = formValues => {
  const errors = {};

  if (!formValues.email) {
    errors.email = "You must enter the valid email.";
  }
  if (!formValues.password) {
    errors.password = "You must enter the valid password.";
  }

  return errors;
};

const mapStateToProps = ({ auth: { errorMessage } }) => {
  return { errorMessage };
};

const signInForm = reduxForm({
  form: "SignIn",
  validate
})(SignIn);
export default connect(
  mapStateToProps,
  actions
)(signInForm);
