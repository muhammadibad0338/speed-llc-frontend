import React, { Fragment, useState } from "react";
//import { withRouter } from "react-router-dom";
import { withRouter } from "../Routes/WithRouter";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { connect } from "react-redux";
import AuthRoutes from "../Routes/Routes";
import { withStyles } from "@material-ui/core";
import Login from "../Screen/Login/Login";
import Signup from "../Screen/Signup/Signup";

import {
  Routes,
  Route,
} from "react-router-dom";

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
});

const Layout = () => {
  const [isAuth, setisAuth] = useState(localStorage.getItem('token'))

  const routesArr = [

    {
      path: "/signup",
      Component: Signup
    },
    {
      path: "/login",
      Component: Login
    }
  ];



  return (
    <>
      <AuthRoutes />
    </>
  )


}


const mapStateToProps = (store) => ({
});


const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);