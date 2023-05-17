import React from 'react';
import {
    Grid,
    Box,
    Typography,
    Button,
    Container,
    Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PhoneIcon from "@material-ui/icons/Phone";
import MailIcon from "@material-ui/icons/Mail";
import fb from "../Assets/SocialIcons/facebook.svg";
import insta from "../Assets/SocialIcons/instagram.svg";

import { Link } from "react-router-dom";
import { useNavigate, useParams, useLocation } from 'react-router';

const styles = makeStyles((theme) => ({
    backBtn: {
        backgroundColor: 'white',
        color: '#FF0000',
        width: '50px',
        height: '60px',
        borderRadius: '50%',
        "&:hover": {
            backgroundColor: 'white',
            color: '#FF0000',
        }
    },
    topMargin: {
        marginTop: '15vh'
    },
    a: {
        display: "flex",
        // justifyContent: "center",
        cursor: "pointer",
        textDecoration: "none",
        color: "black",
        opacity: "0.8",
        margin: "20px 0px",
    },
    mobileAlign: {
        display: 'flex',
        justifyContent: 'center',
        margin: '20px 0px',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'start',
        }
    }
}));


const Footer = () => {
    const classes = styles();
    const navigate = useNavigate();
    const location = useLocation();


    return (
        <Container>

            <Grid container className={classes.topMargin} >
                <Grid item xs={12} >
                    <Box my={3} >
                        <Divider />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.mobileAlign}  >
                    <div>
                        <Typography variant='h5' style={{ textTransform: 'uppercase' }} >NEED HELP?</Typography>
                        <Box mt={2}>
                            <a className={classes.a} href="tel:+92 325 3570857">
                                <PhoneIcon />
                                <Typography style={{ marginLeft: "8px", fontSize: "17px" }}>
                                    +92 325 3570857
                                </Typography>
                            </a>
                            <a className={classes.a} href="tel:+92 315 2193909">
                                <PhoneIcon />
                                <Typography style={{ marginLeft: "8px", fontSize: "17px" }}>
                                    +92 315 2193909
                                </Typography>
                            </a>


                            <a className={classes.a}
                                onClick={() =>
                                    window.open("mailto:samaanhubbusiness@gmail.com")
                                }
                            >
                                <MailIcon />
                                <Typography style={{ marginLeft: "8px", fontSize: "17px" }}>
                                    samaanhubbusiness@gmail.com
                                </Typography>
                            </a>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.mobileAlign}  >
                    <div>
                        <Typography variant='h5' style={{ textTransform: 'uppercase' }} >CUSTOMER SERVICE</Typography>
                        <Box mt={2}>
                            <Typography style={{ margin: "20px 0px" }} >
                                <Link style={{ textDecoration: "none", fontSize: "17px", color: 'black', opacity: '0.8' }} to="/contact">
                                    Contact US
                                </Link>
                            </Typography>
                            <Typography style={{ margin: "20px 0px" }} >
                                <Link style={{ textDecoration: "none", fontSize: "17px", color: 'black', opacity: '0.8' }} to="/terms-and-conditions">
                                    Terms and Conditions
                                </Link>
                            </Typography>
                            <Typography style={{ margin: "20px 0px" }} >
                                <Link style={{ textDecoration: "none", fontSize: "17px", color: 'black', opacity: '0.8' }} to="/privacy-policy">
                                    Privacy Policy
                                </Link>
                            </Typography>
                        </Box>
                    </div>
                </Grid>
                <Grid item xs={12} sm={6} md={4} className={classes.mobileAlign}  >
                    <div>
                        <Typography variant='h5' style={{ textTransform: 'uppercase' }} >FOLLOW US</Typography>
                        <Box mt={2}>
                            <div
                                style={{ cursor: "pointer", display: "flex", margin: "20px 10px" }}
                                onClick={() =>
                                    window.open("https://www.instagram.com/samaanhab/", "_blank")
                                }
                            >
                                <img src={insta} />
                            </div>
                            <div
                                style={{ cursor: "pointer", display: "flex", margin: "20px 10px" }}
                                onClick={() =>
                                    window.open("https://www.facebook.com/SamaanHub-107186678573662/", "_blank")
                                }
                            >
                                <img src={fb} />
                            </div>
                        </Box>
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;
