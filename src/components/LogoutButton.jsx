import React, { Component } from "react";
import { connect } from "react-redux";
import auth from "../modules/auth";
import { Button } from "grommet";

class LogoutButton extends Component {
  onLogout = () => {
    auth.signOut();
    this.props.dispatch({
      type: "LOGOUT",
      payload: {
        authenticated: false,
        userEmail: null,
        createArticle: false,
        loginForm: true
      }
    });
  };

  render() {
    return <Button onClick={this.onLogout} margin="small" color="#7C8EA6" label="Logout" />;
  }
}

export default connect()(LogoutButton);
