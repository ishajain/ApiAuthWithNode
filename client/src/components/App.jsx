import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "../store";
import Header from "./Header";
import Dashboard from "./Dashboard";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from "./Home";
import authGuard from "../components/HOCs/authGuard";

const App = () => (
  <div className="container">
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/dashboard" component={authGuard(Dashboard)} />
        <Route path="/signin" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
      </BrowserRouter>
    </Provider>
  </div>
);

export default App;
