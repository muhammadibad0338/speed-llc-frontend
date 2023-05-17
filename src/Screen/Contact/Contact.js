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


import { Link } from "react-router-dom";
import { useNavigate, useParams, useLocation } from 'react-router';
import Message from './Message';


const styles = makeStyles((theme) => ({
    backBtn: {
        backgroundColor: 'white',
        color: '#FF0000 !important',
        width: '50px',
        height: '60px',
        borderRadius: '50% ',
        cursor:'pointer',
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
}));

const Contact = () => {
    const classes = styles();
    const navigate = useNavigate();

    const goBack = () => {
        navigate('/')
    }

    return (
        <Container style={{ marginTop: '30px' }} >
            <Grid container style={{ margin: '20px 0px' }} >
                <Grid item xs={12} >
                    <button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </button>
                </Grid>

                <Grid item xs={12} style={{ margin: '20px 0px' }} >
                    <Typography className={classes.breadCumbColor} variant='h6' >
                        <Link style={{ color: "#007BFF", textDecoration: "none" }} to="/">
                            Home
                        </Link>
                        <span style={{ color: "gray", textDecoration: "none" }}  > / Contact US</span>
                    </Typography>
                </Grid>
            </Grid>
            <Grid container 
            // style={{ borderRight: "1px solid gray" }}
            >
                <Grid
                    item
                    xs={12}
                    md={12}
                    // style={{ backgroundColor: "#faf3dd", borderRadius: "10px" }}
                >
                <Message/>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Contact;
