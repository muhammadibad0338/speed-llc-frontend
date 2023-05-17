import React, { useEffect } from 'react'
import {
    Grid,
    Typography,
    CircularProgress,
    Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Card from './Component/Card';



import { useNavigate, useLocation,Navigate } from 'react-router';

import { connect } from "react-redux";

// import { setAllProducts, getCategories, setLoading, getProductFilter, getCarousell } from '../../Redux/User/UserAction';
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
    // setAllProducts,
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

        // if (pathname == "/") {
        //     setAllProducts();
        // }
        // else {
        //     let id = pathname.split("/")[2];
        //     getProductFilter(id);
        // }

    }, [pathname])

    if(!token)
    {
        return(
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
                {(productLoading) ? <CircularProgress /> :
                    <>
                        {
                            totalProducts.length > 0 ? totalProducts.map((val, i) => {
                                return (
                                    <Grid key={i} item xs={12} sm={6} md={6} lg={4}
                                        onClick={() => navigate(`/product/${val._id}`)}
                                    >
                                        <Card
                                            image={val.image}
                                            price={val.price}
                                            id={val._id}
                                            name={val.name}
                                            discount={val.discountPercentage}
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
    // setAllProducts: () => dispatch(setAllProducts()),
    // getCategories: () => dispatch(getCategories()),
    // getProductFilter: (id) => dispatch(getProductFilter(id)),
    // getCarousell: () => dispatch(getCarousell())
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);