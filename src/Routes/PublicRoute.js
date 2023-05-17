import React, { useState } from "react";
import { Route, } from "react-router-dom";
import Login from "../Screen/Login/Login";
import ResponsiveDrawer from "../Components/Drawer";

import { makeStyles } from "@material-ui/core/styles";
import Footer from "../Components/Footer";


const styles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        backgroundColor: '#F7F7F7'
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
}));

export const PublicRoute = ({ component: Component, hideDrawer, hideFooter, ...rest }) => {

    const classes = styles();

    return (
        <div className={classes.root}>
            <ResponsiveDrawer hideDrawer={hideDrawer} />
            <main className={classes.content} >
                {/* <div className={classes.appBarSpacer} /> */}
                <div className={classes.container} />
                <Component />
                {!hideFooter && <Footer />}
            </main>
        </div>
    )
};
