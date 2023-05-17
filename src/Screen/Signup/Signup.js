import React, { useState } from 'react'
import {
    Grid,
    OutlinedInput,
    Box,
    Divider,
    Typography,
    CircularProgress,
    NativeSelect,
    InputBase,
    withStyles,
    Button
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Swal from "sweetalert2";

import { connect } from "react-redux";

import SignupBg from "../../Assets/SignupBg.png"
import logo from "../../Assets/logo.png"

import { Link, useNavigate, Navigate } from "react-router-dom"

import { registerUser } from '../../Redux/User/UserAction';


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
        [theme.breakpoints.down("sm")]: {
            width: "90%",
            marginLeft: "5%",
            marginRight: "5%",
        },
    },
    widthSetter: {
        margin: '10px 0px !important',
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
        backgroundColor: "#FF0000 !important",
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


const Signup = ({ registerUser }) => {

    const classes = styles();

    const [isPasswordCorect, setIsPasswordCorect] = useState(true)
    const [disableSingupnBtn, setDisableSingupnBtn] = useState(false)
    const [credential, setCredential] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();

    const signUP = (e) => {
        let pswrd = credential.password.trim()
        const pattern = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
        setIsPasswordCorect(true)
        setDisableSingupnBtn(true)

        if (
            credential.email.trim().length === 0 ||
            credential.password.trim().length === 0) {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "SPEED WORKS",
                html: `<strong><font color="black">Empty Input Field</font></strong>`,
            });
            setDisableSingupnBtn(false)
        }
        else if (!pattern.test(pswrd)) {
            setIsPasswordCorect(false)
            setDisableSingupnBtn(false)
        }
        else {

            e.preventDefault();
            registerUser(credential).then((res) => {
                if (res) {
                    setCredential({
                        email: "",
                        password: "",
                    })
                    navigate('/login')
                }
            })
        }
    }

    const validatePhone = (e) => {
        let phonenumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        let number = e.target.value;
        let lastNumber = Array.from(number)[number.length - 1];
        if (number.length == 0) {
            setCredential({ ...credential, phone: e.target.value })
        }
        else {
            if (number.length <= 11) {
                if (phonenumber.includes(Number(lastNumber))) {
                    setCredential({ ...credential, phone: e.target.value })
                }
            }
        }

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
                            Signup to SPEED WORKS
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} className={classes.alignCenter} >
                    <form className={classes.widthSetter} onSubmit={signUP} >

                        <Box my={3} className={classes.widthSetter}  >
                            <Typography className={classes.inputLabel} >Email Address </Typography>
                            <OutlinedInput onChange={(e) => setCredential({ ...credential, email: e.target.value })} type="email" value={credential.email} required fullWidth className={classes.inputField} placeholder="user@gmail.com" />
                        </Box>
                        <Box my={3} className={classes.widthSetter}  >
                            <Typography className={classes.inputLabel} >Password </Typography>
                            <OutlinedInput onChange={(e) => {
                                setIsPasswordCorect(true)
                                const { value } = e.target;
                                const pattern = /^(?=.*[a-zA-Z0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;
                                if (!pattern.test(value)) {
                                    setIsPasswordCorect(false)
                                    console.log("false")
                                }
                                setCredential({
                                    ...credential,
                                    password: value
                                })

                            }} type="password" value={credential.password} required fullWidth className={classes.inputField} placeholder="*************" />
                        </Box>
                        <Grid item xs={12} mt={-2} >
                            {isPasswordCorect ? null : <p style={{ color: 'red', fontSize: '11px' }} >8-16 characters starts with Alphabets, then Numbers OR Special Characters !@#%^$ </p>}
                        </Grid>
                        <Box my={3} className={classes.widthSetter} >
                            <Button type="submit" disabled={disableSingupnBtn} className={classes.signupBtn} >
                                {disableSingupnBtn ? <CircularProgress style={{ color: 'white' }} /> : 'SIGNUP'}
                            </Button>
                        </Box>
                    </form>
                    <Typography style={{ fontWeight: "bold" }} >Already Have an Account</Typography>
                    <Typography style={{ fontWeight: "bold", color: "#FF0000", margin: "10px 0px" }} >
                        <Link style={{ color: "#FF0000", textDecoration: "none" }} to="/login" >
                            LOGIN
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
    registerUser: (data) => dispatch(registerUser(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);