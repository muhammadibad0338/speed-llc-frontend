import React, { useState, useEffect } from 'react'
import {
    Grid,
    Divider,
    Box,
    Typography,
    Button,
    Container,
    IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import emptyCart from "../../Assets/emptyCart.png";
import { useLocation, useNavigate } from 'react-router';

// import mobile from '.././../Assets/mobile.png'
// import mouse from '.././../Assets/mouse.png'
// import headphone from '.././../Assets/headphone.png'

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'; import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import Checkout from '../Checkout/Checkout';

import { connect } from "react-redux";
import { setProducts, setCart, addQuantity, subQuantity, removeCartProduct } from '../../Redux/User/UserAction';

const styles = makeStyles((theme) => ({
    cartHead: {
        color: '#FF0000'
    },
    chekoutCart: {
        width: '100%',
        height: '260px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
        [theme.breakpoints.up("md")]: {
            position: '-webkit-sticky',
            position: 'sticky',
            top: '100px'
        },
        paddingTop: '10%',
        paddingBottom: '10px'
    },
    finalPriceCntnr: {
        [theme.breakpoints.down("sm")]: {
            margin: 'auto'
        },
    },
    firstDivider: {
        marginBottom: '20px',
    },
    secondDivider: {
        margin: '20px 0px'
    },
    itemImage: {
        width: '100%',
        height: '150px',
        borderRadius: '10px',
        [theme.breakpoints.down("sm")]: {
            height: '100px',
        },
    },
    itemPrice: {
        color: '#FE0000',
        fontWeight: 'bold',
    },
    iconBtn: {
        border: '1px solid #FE0000'
    },
    itemDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly'
    },
    alignItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    chekoutBtn: {
        backgroundColor: '#FF0000 !important',
        color: 'white',
        padding: '20px',
        "&:hover": {
            color: 'white',
            backgroundColor: '#FF0000',
        },
    },
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
    emptyCart: {
        [theme.breakpoints.up("md")]: {
            width: '35%'
        },
        [theme.breakpoints.down("md")]: {
            width: '40%'
        },
        [theme.breakpoints.down("sm")]: {
            width: '60%'
        },
        [theme.breakpoints.down("xs")]: {
            width: '100%'
        },
    },
    addProductBtn: {
        backgroundColor: '#FF0000',
        padding: '20px',
        color: 'white',
        borderRadius: '10px',
        "&:hover": {
            color: 'white',
            backgroundColor: '#FF0000',
        },
    }
}));






const Item = (props) => {
    const classes = styles();

    return (
        <Grid container style={{ marginBottom: '20px' }} >
            <Grid item xs={12} >
                <Divider className={classes.firstDivider} />
            </Grid>
            <Grid item xs={4} sm={3} md={3} >
                <img className={classes.itemImage} src={props?.image} alt="item picture" />
            </Grid>
            <Grid item xs={7} md={8} className={classes.itemDetails} style={{ padding: '5px 10px' }} >
                <Typography>{props?.caption}</Typography>
                <Typography variant="h6" className={classes.itemPrice} >Rs. {props?.price * props?.quantity}</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }} >
                    <IconButton className={classes.iconBtn} size='small'
                        onClick={() => props?.removeItem()
                        } > <RemoveIcon style={{ color: '#FE0000' }} /> </IconButton>
                    <Typography style={{ margin: '0px 10px' }} >{props?.quantity}</Typography>
                    <IconButton className={classes.iconBtn} size='small'
                        onClick={() => props?.addItem()
                        } > <AddIcon style={{ color: '#FE0000' }} /> </IconButton>
                </div>
            </Grid>
            <Grid item xs={1}  >
                <IconButton onClick={() => props?.removeCartProduct()} size='medium' style={{ color: 'red' }} >
                    <DeleteOutlineIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12} >
                <Divider className={classes.secondDivider} />
            </Grid>
        </Grid>
    )
}


const Cart = ({ cart, addQuantity, subQuantity, removeCartProduct }) => {

    const classes = styles();

    let navigate = useNavigate();
    const { pathname } = useLocation()

    const [openDialog, setOpenDialog] = useState(false)

    

    const goBack = () => {
        navigate('/')
    }

   

    const totalAmount = () => {
        let total = 0;
        cart.forEach(element => {
            total += element?.price * element?.quantity
        });
        return total
    }

    let deliveryCharges = 100;

    // if(cart.lenght == 0)
    // {
    //     <Container style={{ marginTop: '20px' }}></Container>
    // }

    return (
        <>
            <Container style={{ marginTop: '20px' }}>
                {
                    cart.length == 0 ? <Grid container >
                        <Grid item xs={12} >
                            <Button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </Button>
                        </Grid>
                        <Grid item xs={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
                            <img className={classes.emptyCart} src={emptyCart} />
                            <Typography style={{ fontWeight: 'bold', color: '#777777', textAlign: 'center' }} variant='h3' >Your Cart is Empty</Typography>
                            <Typography style={{ color: '#777777', textAlign: 'center', margin: '10px 0px' }} variant='h6' >Looks like you haven't added any product to your cart</Typography>
                            <Button
                                onClick={() => navigate('/')}
                                className={classes.addProductBtn} >Add Product to Cart</Button>
                        </Grid>
                    </Grid>
                        : <Grid container spacing={4} >
                            <Grid item xs={12} >
                                <Button className={classes.backBtn} variant='contained' onClick={goBack} > <ArrowBackIcon fontSize="large" /> </Button>
                            </Grid>
                            <Grid item xs={12} style={{ marginBottom: '0px' }} >
                                <Typography className={classes.cartHead} variant="h3" >Cart</Typography>
                            </Grid>
                            <Grid item xs={12} sm={12} md={8} >
                                {
                                    cart.map((val, i) => {
                                        return (<Item
                                            key={i}
                                            ind={i}
                                            price={val?.price}
                                            image={val?.image}
                                            caption={val?.name}
                                            quantity={val?.quantity}
                                            addItem={() => addQuantity(i)}
                                            removeItem={() => subQuantity(i)}
                                            removeCartProduct={() => removeCartProduct(i)}
                                            countInStock={val?.countInStock}
                                        />)
                                    })
                                }
                            </Grid>
                            <Grid item xs={12} sm={8} md={4} className={classes.finalPriceCntnr} >
                                <Box className={classes.chekoutCart} >
                                    <div style={{ height: '80%', padding: '0px 10%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }} >
                                        <div className={classes.alignItem} >
                                            <Typography>Total Amount</Typography>
                                            <Typography>{totalAmount(cart)}</Typography>
                                        </div>
                                        <div className={classes.alignItem} >
                                            <Typography>Delivery charges</Typography>
                                            <Typography>Free Delivery</Typography>
                                        </div>
                                        <div className={classes.alignItem} >
                                            <Typography>Total Amount</Typography>
                                            <Typography>{totalAmount(cart)}</Typography>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'center' }} >
                                        <Button className={classes.chekoutBtn} onClick={() => navigate('/checkout')} >Check Out</Button>
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                }
            </Container>
        </>
    )
}

const mapStateToProps = (store) => ({
    currentProduct: store.user.product,
    loading: store.user.loading,
    cart: store.user.cart,
});


const mapDispatchToProps = (dispatch) => ({
    setCart: (data) => dispatch(setCart(data)),
    addQuantity: (index) => dispatch(addQuantity(index)),
    subQuantity: (index) => dispatch(subQuantity(index)),
    removeCartProduct: (index) => dispatch(removeCartProduct(index))
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);