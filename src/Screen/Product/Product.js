import React, { useEffect, useState } from 'react'
import {
    Grid,
    Divider,
    Box,
    Typography,
    Button,
    Container,
    CircularProgress,
    Hidden,
    Chip
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import ProductCarousel from '../../Components/ProductCarousel';

import Swal from "sweetalert2";

// import { useNavigate, useParams } from 'react-router';
import { useNavigate, useParams, Link } from "react-router-dom";
import { connect } from "react-redux";

import { setProducts, setCart, getProduct, setProductsData, setCurrentProductPrice, getProductData, getCurrentProductPrice } from '../../Redux/User/UserAction';

const styles = makeStyles((theme) => ({
    backBtn: {
        backgroundColor: 'white !important',
        color: '#FF0000 !important',
        width: '50px',
        height: '60px',
        borderRadius: '50% !important',
        "&:hover": {
            backgroundColor: 'white !important',
            color: '#FF0000 !important',
        }
    },
    productName: {
        color: '#242424',
        fontWeight: 'bold !important',
        fontSize: '3rem !important',
        marginBottom: '10px',
    },
    price: {
        color: '#FF0000',
        fontWeight: "bold !important",
        fontSize: '2rem !important',
        margin: '5px 0px'
    },
    heading: {
        color: '#242424',
        fontWeight: 'bold',
        fontSize: '1.5rem !important',
        textTransform: 'uppercase'
    },
    fullDivider: {
        margin: '10px 0px'
    },
    smallDivider: {
        height: '3px',
        width: '65px',
        marginTop: '3px'
    },
    mapImg: {
        width: '50%',
        height: 'auto',
        marginTop: '10px'
    },
    addToCart: {
        border: '3px solid #FF0000 !important',
        color: '#FF0000 !important',
        [theme.breakpoints.down("sm")]: {
            width: '50%',
            padding: '7% 10%'
        },
        "&:hover": {
            color: '#FF0000',
        }
    },
    alreadyAddToCart: {
        border: '1px solid white !important',
        backgroundColor: '#FF0000 !important',
        color: 'white !important',
        [theme.breakpoints.down("sm")]: {
            width: '50%',
            padding: '7% 10%'
        },
        "&:hover": {
            backgroundColor: '#FF0000',
            color: 'white',
        }
    },
    btnCntnr: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexWrap: 'wrap',
        marginTop: '40px !important',
        [theme.breakpoints.down("sm")]: {
            marginTop: '20px !important',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
    },
    productSlider: {
        marginTop: '30px',
        [theme.breakpoints.down("sm")]: {
            marginBottom: '20px !important'
        },
    },
    productImage: {
        maxHeight: '430px',
        maxWidth: '85%',
        width: 'auto',
        borderRadius: '20px !important',
        [theme.breakpoints.down("xs")]: {
            width: '100%',
            height: 'auto',
            borderRadius: '5px !important'
        },
    }
}));


const Product = ({ setProductsData, currentProductData, loading, setCart, cart, getProduct, getProductData, getCurrentProductPrice, currentProduct, setProducts, setCurrentProductPrice, currentProductPricing }) => {

    const classes = styles();
    const navigate = useNavigate();
    const { id } = useParams();
    const [isExist, setisExist] = useState(false)

    const goBack = () => {
        navigate('/')
    }

    useEffect(() => {
        setProductsData(id)
        setProducts(id)
        setCurrentProductPrice(id)

        return () => {
            getProduct({});
            getCurrentProductPrice({})
            getProductData({})
        }

    }, [])

    const isAlreadyAddedtoCart = (id) => {
        let isExist = false;
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            if (element.product == id) {
                isExist = true
            }
        }

        return isExist
    }

    const addToCart = (product, name, image, price) => {
        let isExist = false;
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            if (element.product == product) {
                isExist = true
            }
        }
        if (!isExist) {

            setCart({
                product,
                quantity: 1,
                name,
                image,
                price
            })
        }
        else {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "Samaan Hub",
                html: `<strong><font color="black">already exist</font></strong>`,
            });
        }


    }

    const buyAllStock = (product, name, image, price, quantity) => {
        let isExist = false;
        for (let index = 0; index < cart.length; index++) {
            const element = cart[index];
            if (element.product == product) {
                isExist = true
            }
        }
        if (!isExist) {

            setCart({
                product,
                quantity: quantity,
                name,
                image,
                price
            })
        }
        else {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "Samaan Hub",
                html: `<strong><font color="black">already exist</font></strong>`,
            });
        }


    }


    const calculateWithoutDiscount = (discount, amount) => {
        let remainPerc = 100 - discount;
        let perc = amount * 100;
        return perc / remainPerc;
    }

    // if (loading) {
    //     return <Container style={{ height: '100vh', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
    //         <CircularProgress />
    //     </Container>
    // }

    return (
        <Container style={{ marginTop: '30px' }} >

            <Grid container style={{ margin: '20px 0px' }} >
                <Grid item xs={12} >
                    <Button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </Button>
                </Grid>
                <Grid item xs={12}  >
                    {/* <Hidden mdUp > */}
                    <Typography variant='h5' style={{ color: "#6C757D", marginTop: '20px' }}>
                        <Link style={{ textDecoration: "none", marginRight: '7px' }} to="/">
                            Home /
                        </Link>
                        Products /  <spam style={{ color: '#FF0000' }} >{id}</spam>
                    </Typography>
                    {/* </Hidden> */}
                </Grid>

            </Grid>
            {
                Object.keys(currentProductData)?.length == 0
                    ? <CircularProgress /> :

                    <Grid container style={{ margin: '20px 0px' }} >
                        <Grid item xs={12} md={6} className={classes.productSlider} >

                            <Box style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className={classes.productImage} src={currentProductData?.files[0]?.links[0]?.url} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6} style={{ marginTop: '30px' }}  >
                            <Typography variant='h4' className={classes.productName} >{currentProduct?.attributes?.product_name}.</Typography>
                            <Typography variant="h6" className={classes.price} >
                                $ {currentProductPricing?.attributes?.pricelists[0]?.price}
                            </Typography>
                            <Divider className={classes.fullDivider} />
                            <Typography className={classes.heading} style={{ marginTop: '20px' }} > Description </Typography>
                            <Divider className={classes.smallDivider} />
                            <Typography style={{ margin: '15px 0px' }} >
                                {currentProduct?.attributes?.part_description}.
                            </Typography>
                            <Box className={classes.btnCntnr}  >
                                {isAlreadyAddedtoCart(currentProduct.id) ? <Button className={classes.alreadyAddToCart}  >Already exist In Cart</Button> :
                                    <Button variant='outlined' className={classes.addToCart} startIcon={<ShoppingCartOutlinedIcon />}
                                        onClick={() => addToCart(currentProduct.id, currentProduct?.attributes?.product_name, currentProduct?.attributes?.thumbnail, currentProductPricing?.attributes?.pricelists[0]?.price)} >Add to cart</Button>
                                }

                            </Box>
                            <div style={{ margin: '30px 0px', display: 'flex' }} >
                                <Typography style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '20px' }} >Category:</Typography>
                                <Chip label={currentProduct?.attributes?.category} />
                            </div>
                        </Grid>
                    </Grid>
            }
        </Container>
    )
}

const mapStateToProps = (store) => ({
    currentProductData: store.user.productData,
    currentProduct: store.user.product,
    currentProductPricing: store.user.currentProductPrice,
    loading: store.user.productLoading,
    cart: store.user.cart,
});


const mapDispatchToProps = (dispatch) => ({
    setProductsData: (id) => dispatch(setProductsData(id)),
    setProducts: (id) => dispatch(setProducts(id)),
    setCurrentProductPrice: (id) => dispatch(setCurrentProductPrice(id)),
    setCart: (data) => dispatch(setCart(data)),
    getProduct: (data) => dispatch(getProduct(data)),
    getProductData: (data) => dispatch(getProductData(data)),
    getCurrentProductPrice: (data) => dispatch(getCurrentProductPrice(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);