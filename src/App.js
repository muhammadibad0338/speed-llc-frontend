import React, { useEffect } from 'react'
import logo from "./Assets/logo.png";
import "./App.css";
import { useTheme, useMediaQuery } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@mui/material/styles"
// import { ThemeProvider } from "@material-ui/styles";
//import { withRouter } from "react-router-dom";
import { withRouter } from "./Routes/WithRouter";
import Layout from "./Layout/Layout";
import { connect } from "react-redux";

const customTheme = createTheme({
  typography: {
    fontFamily: ["Nunito-Regular", "sans-serif"].join(","),
    fontSize: 12,
  },
  overrides: {
    MuiButton: {
      root: {
        height: 40,
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Layout />
    </ThemeProvider>
  );
}

export default App;
