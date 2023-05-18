import React, { useEffect } from 'react'
import {
    Grid,
    Typography,
    CircularProgress,
    Divider,
    Box
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from './Component/Card';



import { useNavigate, useLocation, Navigate } from 'react-router';

import { connect } from "react-redux";

import {
    setAllProducts,
    // getCategories, setLoading, getProductFilter, getCarousell
} from '../../Redux/User/UserAction';
import HomeCarousell from '../../Components/HomeCarousell';

const styles = makeStyles((theme) => ({
    banner: {
        width: '100% !important',
        height: 'auto !important',
        [theme.breakpoints.down("sm")]: {
            height: '200px !important'
        },
    },
    noProductHead: {
        color: '#FF0000',
        textAlign: 'center'
    },
    carousellcontnr: {
        [theme.breakpoints.down("xs")]: {
            marginBottom: '10px',

        },
    }
}));

const Home = ({
    setAllProducts,
    totalProducts,
    //   getCategories, getProductFilter, 
    productLoading,
    //  getCarousell 
}) => {

    const classes = styles();
    let { pathname } = useLocation();
    const navigate = useNavigate();
    let token = localStorage.getItem('token');



    useEffect(() => {

        console.log(pathname, "pathname")
        if (pathname == "/") {
            setAllProducts();
        }

    }, [pathname])

    if (!token) {
        return (
            <Navigate to="/login" />
        )
    }

    return (
        < >
            <Grid container >
                <Grid item xs={12} className={classes.carousellcontnr}  >
                    <HomeCarousell />
                    <Divider />
                </Grid>
                {(productLoading) ?
                    <Box style={{ width: '100%', height: '500px', display: 'flex',flexFlow:'column' ,justifyContent: 'center', alignItems: 'center' }} >
                        <img src='https://www.speedworksllc.com/wp-content/uploads/2023/01/preloader.gif' style={{ width: '200px', height: '350px',marginBottom:'20px' }} />
                        <CircularProgress />
                    </Box> :
                    <>
                        {
                            totalProducts.length > 0 ? totalProducts.map((val, i) => {
                                return (
                                    <Grid key={i} item xs={12} sm={6} md={4} lg={3}
                                        onClick={() => navigate(`/product/${val.id}`)}
                                    >
                                        <Card
                                            image={val?.attributes?.thumbnail}
                                            // price={val?.attributes?.price}
                                            id={val?.attributes?._id}
                                            name={val?.attributes?.product_name}
                                            description={val?.attributes?.part_description}
                                        // discount={val.discountPercentage}
                                        />
                                    </Grid>
                                )
                            }) : <Grid item xs={12} >
                                <Typography variant='h4' className={classes.noProductHead} >No Product To Show In Selected Category </Typography>
                            </Grid>
                        }
                    </>
                }

            </Grid>
        </>
    )
}

const mapStateToProps = (store) => ({
    totalProducts: store.user.products,
    productLoading: store.user.productLoading,
    carousellLoading: store.user.carousellLoading
});


const mapDispatchToProps = (dispatch) => ({
    setAllProducts: () => dispatch(setAllProducts()),
    // getCategories: () => dispatch(getCategories()),
    // getProductFilter: (id) => dispatch(getProductFilter(id)),
    // getCarousell: () => dispatch(getCarousell())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);