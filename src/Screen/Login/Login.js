import React, { useState } from 'react'
import {
    Grid,
    OutlinedInput,
    Box,
    Typography,
    Button,
    CircularProgress
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";

import SignupBg from "../../Assets/SignupBg.png"
import logo from "../../Assets/logo.png"

import { Link, useNavigate, Navigate } from "react-router-dom"

import { loginUser, setLoading } from '../../Redux/User/UserAction';

const styles = makeStyles((theme) => ({
    redBanner: {
        width: "100%",
        height: "auto",
        maxHeight: "105px"
    },
    signupBg: {
        backgroundColor: "#F7F7F7",
        minHeight: "100vh"
    },
    logo: {
        width: "auto",
        maxHeight: "100px"
    },
    alignCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    inputField: {
        backgroundColor: "#FFFFFF",
        border: "none !important",
        outline: "none !important",
        borderRadius: "5px",
        height: "35px",
        width: "350px",
        // margin:"5px 10px",
        // "&:hover": {
        //     "& $notchedOutline": {
        //         border: "none",
        //     },
        // },
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
        },
    },
    widthSetter: {
        width: "auto",
        [theme.breakpoints.down("sm")]: {
            width: "100%",
        },
    },
    inputLabel: {
        color: "black",
        textTransform: "uppercase",
        fontWeight: "bold",
        alignSelf: "flex-start",
        [theme.breakpoints.down("sm")]: {
            marginLeft: "5%",
            marginRight: "5%",
        },
    },
    signupBtn: {
        width: "100%",
        backgroundColor: "#FF0000",
        color: "white",
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
        },
        "&:hover": {
            backgroundColor: "#FF0000",
            color: "white",
        },
    }
}));


const Login = ({
    loginUser
}) => {

    const classes = styles();
    let navigate = useNavigate();


    const [credential, setCredential] = useState({
        email: "",
        password: "",
    })
    const [loginLoading, setloginLoading] = useState(false)

    const checkLogin = (e) => {
        setloginLoading(true)
        e.preventDefault();
        loginUser(credential.email, credential.password).then((res) => {
            if (res) {
                navigate('/')
            }
            setloginLoading(false)
        })
    }


    if (localStorage.getItem('token')) {
        return <Navigate to={-1} />
    }
    return (
        <>
            <Grid container className={classes.signupBg} >
                <Grid item xs={12} >
                    <img className={classes.redBanner} src={SignupBg} />
                </Grid>
                <Grid item xs={12}   >
                    <Box className={classes.alignCenter} sx={{ paddingY: 2 }} >
                        <Link to="/" >
                            <img className={classes.logo} src={logo} />
                        </Link>
                        <Typography variant="h4" style={{ color: "#FF0000", marginTop: "20px", textTransform: "uppercase", fontWeight: "bold" }} >
                            SPEED WORKS
                        </Typography>
                        <Typography variant="h6" style={{ fontWeight: "bold", letterSpacing: "2px", marginTop: "5px" }} >
                            Login to SPEED WORKS
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className={classes.alignCenter} >
                    <form className={classes.widthSetter} >
                        <Box my={3} className={classes.widthSetter}  >
                            <Typography className={classes.inputLabel} >Email Address </Typography>
                            <OutlinedInput value={credential.email} required type="email" onChange={(e) => setCredential({ ...credential, email: e.target.value })} fullWidth className={classes.inputField} placeholder="user@gmail.com" />
                        </Box>
                        <Box my={3} className={classes.widthSetter}  >
                            <Typography className={classes.inputLabel} >Password </Typography>
                            <OutlinedInput value={credential.password} required type="password" onChange={(e) => setCredential({ ...credential, password: e.target.value })} fullWidth className={classes.inputField} placeholder="*************" />
                        </Box>
                        <Box my={3} className={classes.widthSetter} >
                            <Button
                                type='submit'
                                className={classes.signupBtn}
                                disabled={loginLoading}
                                onClick={checkLogin} > {loginLoading ? <CircularProgress style={{ color: 'white' }} /> : "LOGIN"} </Button>
                        </Box>
                    </form>
                    <Typography style={{ fontWeight: "bold" }} >Dont Have an Account</Typography>
                    <Typography style={{ fontWeight: "bold", color: "#FF0000", margin: "10px 0px" }} >
                        <Link style={{ color: "#FF0000", textDecoration: "none" }} to="/signup" >
                            SIGNUP
                        </Link>
                    </Typography>
                </Grid>

            </Grid>
        </>
    )
}

const mapStateToProps = (store) => ({
});


const mapDispatchToProps = (dispatch) => ({
    loginUser: (email, password) => dispatch(loginUser(email, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);