import React, { Component, useState, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { Button, Grid, Typography } from "@material-ui/core";

import { useNavigate, useLocation, } from 'react-router';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { CircularProgress } from "@mui/material";

import slider1 from "../Assets/slider1.png"
import slider2 from "../Assets/slider2.jpg"

const useStyles = makeStyles((theme) => ({
    landing: {
        paddingTop: 70,
        height: "calc(90vh)",
        width: "100%",
        backgroundColor: "black",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        [theme.breakpoints.down("sm")]: {
            height: "calc(100vh)",
        },
    },
    root: {
        overflow: "hidden !important",
        [theme.breakpoints.down("xs")]: {
            marginTop: '5px',

        },
    },
    sliderImage: {
        width: '100%',
        height: '370px',
        [theme.breakpoints.down("md")]: {
            height: "270px",
        },
        [theme.breakpoints.down("xs")]: {
            height: "180px",
        },
        zIndex: '-1'
    },
    backBtn: {
        backgroundColor: 'black !important',
        color: 'white !important',
    },
    forwardBtn: {
        backgroundColor: 'black !important',
        color: 'white !important',
    },
    btnCntnr: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        top: '50%',
        zIndex: '100',
        marginTop: '-40px'
    },
    slide: {
        "&:hover": {
            cursor: 'pointer'
        }
    }
}));

const HomeCarousell = ({ data, carousellLoading, carousell }) => {

    const classes = useStyles();
    const navigate = useNavigate();
    const customSlider = useRef();

    let settings = {
        dots: true,
        infinite: true,
        speed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        autoplay: true,
        speed: 5000,
        autoplaySpeed: 5000,
        //   cssEase: "linear",
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1,
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };





    return (
        <Grid container  >
            <Grid item xs={12} className={classes.root} >
                <div className={classes.btnCntnr} >
                    <Button
                        className={classes.backBtn}
                        onClick={() => customSlider.current.slickNext()} > <ArrowBackIcon /> </Button>
                    <Button
                        className={classes.forwardBtn}
                        onClick={() => customSlider.current.slickPrev()} > <ArrowForwardIcon /></Button>
                </div>
                <Slider ref={slider => (customSlider.current = slider)} {...settings} arrows={false}  >
                    {
                        [slider1, slider2].map((val, index) => {
                            return (
                                <div key={index} className={classes.slide} onClick={() => {

                                }} >
                                    <img className={classes.sliderImage} src={val} alt='Banner' />
                                </div>
                            )
                        })
                    }
                </Slider>

            </Grid>
        </Grid>
    );
};



const mapStateToProps = (store) => ({
    carousell: store.user.carousell,
    carousellLoading: store.user.carousellLoading
});


const mapDispatchToProps = (dispatch) => ({
    // setAllProducts: () => dispatch(setAllProducts()),
    // getCategories: () => dispatch(getCategories()),
    // getProductFilter: (id) => dispatch(getProductFilter(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeCarousell);