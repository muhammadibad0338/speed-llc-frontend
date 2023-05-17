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

const Terms = () => {

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
                        <span style={{ color: "gray", textDecoration: "none" }}  > / Term & Conditions</span>
                    </Typography>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant='h4' style={{ textTransform: 'uppercase' }} >TERMS & CONDITIONS</Typography>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >TERMS</Typography>
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                        By accessing the website at {window.location.href.split('terms-and-conditions')[0]}, you are agreeing to be bound by these terms of service, all applicable laws and regulations,
                        and agree that you are responsible for compliance with any applicable local laws.
                        If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                        The materials contained in this website are protected by applicable copyright and trademark law.
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >LIMITATIONS</Typography>
                    <p 
                    // style={{ fontFamily: 'monospace', color: '#303030', fontStyle: 'inherit', fontWeight: '600', letterSpacing: '1px', lineHeight: '1.42857143', fontSize: '1rem' }} 
                    style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}}
                    >
                        In no event shall {window.location.href.split('.')[1]} Ltd be liable for any damages (including, without limitation, damages for loss of data or profit,
                        or due to business interruption) arising out of the use or inability to use the materials on {window.location.href.split('.')[1]} Ltd's website,
                        even if {window.location.href.split('.')[1]} Ltd or a {window.location.href.split('.')[1]} Ltd authorized representative has been notified orally or in writing of the possibility of such damage.
                        Because some jurisdictions do not allow limitations on implied warranties,
                        or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >ACCURACY OF MATERIALS</Typography>
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                        The materials appearing on {window.location.href.split('.')[1]} website could include technical, typographical, or photographic errors.
                        {window.location.href.split('.')[1]}  does not warrant that any of the materials on its website are 100% accurate, complete or current.
                        {window.location.href.split('.')[1]}  may make changes to the materials contained on its website at any time without notice. However,
                        {window.location.href.split('.')[1]}  does not make any commitment to update the materials.
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >PRODUCT & SERVICE DESCRIPTIONS</Typography>
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                        Whilst we try to display the colors of our products accurately on the Website,
                        the actual colors you see will depend on your screen and we cannot guarantee that your screen's
                        display of any color will accurately reflect the color of the product on delivery.
                        All items are subject to availability.
                        We will inform you as soon as possible if the product(s) or service(s) you have ordered are not available and we may offer
                        an alternative product(s) or service(s) of equal or higher quality and value otherwise the order had to be canceled.
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >DELIVERY OF YOUR ORDER</Typography>
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                        Our products are sold on a delivery duty unpaid basis. The recipient may have to pay import duty or a formal customs entry fee prior to or on delivery.
                        Additional taxes, fees or levies may apply according to local legislation and customers are required to
                        check these details before placing an order for international delivery.
                    </p>
                    <br />
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                        We will deliver to the home or office address indicated by you when you place an order.
                        We cannot deliver to PO boxes. All deliveries must be signed for upon receipt.
                    </p>
                    <br />
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                        We reserve the right to cancel your purchase in the event nobody is available to sign for receipt.
                        You bear the risk for the products once delivery is completed
                    </p>
                </Grid>
                <Grid item xs={12} style={{ marginTop: '50px' }} >
                    <Typography variant='h6' style={{ textTransform: 'uppercase', color: 'gray' }} >MODIFICATIONS</Typography>
                    <p style={{ color:'#000',fontSize:'14px',fontWeight:'400',lineHeight:'24px',textAlign:'left'}} >
                    {window.location.href.split('.')[1]}may revise these terms of service for its website at any time without notice.
                     By using this website you are agreeing to be bound by the then current version of these terms of service.
                    </p>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Terms;
