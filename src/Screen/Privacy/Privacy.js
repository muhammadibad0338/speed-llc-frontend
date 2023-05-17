import React from 'react';
import {
    Grid,
    Box,
    Typography,
    Button,
    Container,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
}));


const Privacy = () => {

    const classes = styles();
    const navigate = useNavigate();
    const location = useLocation();
    const goBack = () => {
        navigate('/')
    }

    return (
        <Container style={{ marginTop: '30px' }} >
            <Grid container style={{ margin: '20px 0px' }} >
                <Grid item xs={12} >
                    <Button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </Button>
                </Grid>
                <Grid item xs={12} style={{ margin: '20px 0px' }} >
                    <Typography className={classes.breadCumbColor} variant='h6' >
                        <Link style={{ color: "#007BFF", textDecoration: "none" }} to="/">
                            Home
                        </Link>
                        <span style={{ color: "gray", textDecoration: "none" }}  > / Privacy policy</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant='h4' style={{ textTransform: 'uppercase' }} >PRIVACY POLICY</Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <p style={{ color: '#000', fontSize: '14px', fontWeight: '400', lineHeight: '24px', textAlign: 'left' }} >
                        Your privacy is important to us. It is {window.location.href.split('.')[1]}  policy to respect your privacy regarding
                        any information we may collect from you across our website, {window.location.href.split('privacy-policy')[0]}, and other sites we own and operate
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >THE INFORMATION WE MAY COLLECT </Typography>
                    <p style={{ color: '#000', fontSize: '14px', fontWeight: '400', lineHeight: '24px', textAlign: 'left' }}
                    >
                        We may collect and process the following types of personal information:
                    </p>
                    <br />
                    <p style={{ color: '#000', fontSize: '14px', fontWeight: '400', lineHeight: '24px', textAlign: 'left' }} >
                    {window.location.href.split('.')[1]} collects personal information in several ways 
                    when you place an order or register for a service offered by {window.location.href.split('.')[1]}  By registering,
                     you are consenting to the collection of your personal data. If an order is placed with us,
                      we need to hold personal information including your name, email address, phone numbers, home address,
                       shipping and credit/debit card billing address (es) so that we can process and fulfill your order.
                     Saved card details will never be shared with third parties and will only be used to process your order,
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >USE OF DATA & INFORMATION</Typography>
                    <p style={{ color: '#000', fontSize: '14px', fontWeight: '400', lineHeight: '24px', textAlign: 'left' }} >
                    {window.location.href.split('.')[1]} may use your personal information for the processing of orders, payments, 
                    and to provide you with a personalized shopping experience. We will also use your details to 
                    fulfill and deliver your orders and manage your account. Personal information that 
                    you provide may be disclosed to a credit reference or fraud prevention agency, which may keep a record of that information.
                     We may also use your personal information to send you marketing updates but
                      only ever in accordance with your preferences (as detailed in the next section). 
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >Where and how to ask questions or file complaints?</Typography>
                    <p style={{ color: '#000', fontSize: '14px', fontWeight: '400', lineHeight: '24p', textAlign: 'left' }} >
                    If you require more information please go to the contact us section of the web site 
                    and send an email to the relevant {window.location.href.split('.')[1]} department, if you wish to.
                    </p>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Privacy;
