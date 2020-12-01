import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from "../components/auth/ProtectedRoute";

import MainPage from "../components/general/MainPage";
import About from "../components/general/About";
import OurTeam from "../components/general/OurTeam";
import SignUp from "../components/user/SignUp";
import Login from "../components/user/Login";
import Dashboard from "../components/snippets/Dashboard";
import Snippet from "./snippets/Snippet";
import PageNotFound from "./general/PageNotFound";

export class Content extends Component {
  render() {
    return (
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/about" component={About} />
          <Route path="/ourteam" component={OurTeam} />
          <Route path="/signup" component={SignUp} />
          <Route path="/login" component={Login} />
          <ProtectedRoute path="/dashboard" component={Dashboard} />
          <ProtectedRoute path="/snippet/:id" component={Snippet} />
          <Route path="*" component={PageNotFound}/>
        </Switch>
      </React.Fragment>
    );
  }
}

export default Content;
