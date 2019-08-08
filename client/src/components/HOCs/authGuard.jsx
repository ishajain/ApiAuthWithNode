import React from "react";
import { connect } from "react-redux";

// export default OriginalComponent => {
//   return class extends React.PureComponent {

//   };
// };]

// 1. HOCs is a component which takes input as component
// 2. Enhanced something
// 3. retunn the component

export default OriginalComponent => {
  class EnhancedComponent extends React.Component {
    checkAuth() {
      if (!this.props.isAuthenticated) return this.props.history.push("/");
    }
    componentDidMount() {
      this.checkAuth();
    }
    componentWillUpdate() {
      this.checkAuth();
    }
    render() {
      return this.props.isAuthenticated ? (
        <OriginalComponent {...this.props} />
      ) : null;
      //return <OriginalComponent {...this.props} />;
    }
  }

  const mapStateToProps = ({ auth: { isAuthenticated } }) => {
    return { isAuthenticated };
  };

  return connect(
    mapStateToProps,
    {}
  )(EnhancedComponent);
};

//BASIC DEFINATION OF HOC
// export default OriginalComponent => {
//   class EnhancedComponent extends React.Component {
//     render() {
//       return <OriginalComponent />;
//     }
//   }
//   return EnhancedComponent;
// };
