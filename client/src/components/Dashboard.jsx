import React from "react";
import { connect } from "react-redux";
import { getSecretResource } from "../actions";

class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getSecretResource();
  }
  render() {
    return (
      <div>
        Welcome to Dashboard!!,<h3>{this.props.secret}</h3>
      </div>
    );
  }
}

const mapStateToProps = ({ dashboard: { secret } }) => {
  return { secret };
};
export default connect(
  mapStateToProps,
  { getSecretResource }
)(Dashboard);
