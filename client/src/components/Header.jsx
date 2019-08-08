import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../actions";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
  onSignOut = () => {
    this.props.signOut();
    this.props.history.push("/");
  };
  render() {
    const { isAuthenticated } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <NavLink className="navbar-brand" to="/">
          React API Auth
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarColor03">
          <ul className="navbar-nav mr-auto">
            {isAuthenticated && (
              <li className="nav-item active">
                <NavLink className="nav-link" to="/dashboard">
                  {" "}
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ml-auto">
            {!isAuthenticated && [
              <li className="nav-item" key="signUp">
                <NavLink className="nav-link" to="/signup">
                  {" "}
                  Sign Up
                </NavLink>
              </li>,
              <li className="nav-item" key="signIn">
                <NavLink className="nav-link" to="/signin">
                  {" "}
                  Sign In
                </NavLink>
              </li>
            ]}
            {isAuthenticated && (
              <li className="nav-item">
                <button
                  className="btn btn-secondary my-2 my-sm-0"
                  onClick={this.onSignOut}
                >
                  Sign Out
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = ({ auth: { isAuthenticated } }) => {
  return { isAuthenticated };
};

export default connect(
  mapStateToProps,
  { signOut }
)(withRouter(Header));
