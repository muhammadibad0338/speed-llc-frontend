import React, { useState, useEffect } from 'react'
import { Typography, Box, Divider, OutlinedInput, Button, Container, Grid, InputBase, Hidden } from '@material-ui/core'
import NativeSelect from "@material-ui/core/NativeSelect";
import { withStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";

import { useNavigate } from 'react-router'
import { Link } from "react-router-dom";
import { Country, State, City, getCountryByCode, } from "country-state-city";


import { connect } from "react-redux";
import {
    setProducts, setCart,
    // confirmCheckout,
    setCartEmpty
} from '../../Redux/User/UserAction';

import Swal from "sweetalert2";

const styles = makeStyles((theme) => ({
    checkoutHead: {
        color: '#FF0000'
    },
    firstDivider: {
        marginBottom: '20px',
    },
    placeOrderBtn: {
        backgroundColor: '#FF0000',
        border:'none',
        borderRadius:'10px',
        cursor:'pointer',
        color: 'white',
        padding: '20px',
        marginTop: '50px',
        "&:hover": {
            color: 'white',
            backgroundColor: '#FF0000',
        },
    },
    finalPriceCntnr: {
        [theme.breakpoints.down("sm")]: {
            margin: 'auto'
        },
    },
    chekoutCart: {
        width: '100%',
        height: '260px',
        backgroundColor: '#FFFFFF',
        borderRadius: '10px',
        boxShadow: "0 0.5rem 1rem rgb(0 0 0 / 15%)",
        // margin:'auto',
        [theme.breakpoints.up("md")]: {
            position: '-webkit-sticky',
            position: 'sticky',
            top: '100px'
        },
        paddingTop: '10%',
        paddingBottom: '10px'
    },
    alignItem: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    chekoutBtn: {
        backgroundColor: '#FF0000',
        color: 'white',
        padding: '20px',
        "&:hover": {
            color: 'white',
            backgroundColor: '#FF0000',
        },
    },
    productInput: {
        marginTop: "10px",
        maxWidth: "100%",
        height: "45px",
        borderRadius: "10px",
    },
}));

const BootstrapInput = withStyles((theme) => ({
    root: {
        "label + &": {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: "10px",
        marginTop: "5px",
        position: "relative",
        backgroundColor: theme.palette.background.paper,
        border: "1px solid #ced4da",
        color: 'black',
        fontSize: 16,
        padding: "10px 26px 10px 12px",
        transition: theme.transitions.create(["border-color", "box-shadow"]),
        fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        "&:focus": {
            borderRadius: 4,
            borderColor: "#80bdff",
            boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
        },
    },
}))(InputBase);

const Checkout = ({ openDialog, setOpenDialog, currentUser, cart,
    // confirmCheckout,
    setCartEmpty }) => {

    const classes = styles();
    const navigate = useNavigate();
    const uid = localStorage.getItem('uid')
    const allCountries = Country.getAllCountries();



    const [address, setaddress] = useState("")
    const [shippingAddress, setshippingAddress] = useState("")
    const [phoneno, setphoneno] = useState('');
    const [postalCode, setpostalCode] = useState('');
    const [selectCountry, setselectCountry] = useState('PK');
    const [selectCity, setselectCity] = useState('Karachi');
    const [selectCountrytCity, setselectCountrytCity] = useState([...City.getCitiesOfCountry('PK')]);
    const [countryName, setCountryName] = useState("Pakistan");

    const handleSelectCountry = (e) => {
        let code = e.target.value
        let countryName = Country.getCountryByCode(`${code}`);

        setselectCountry(code);
        setCountryName(countryName?.name)
        setselectCountrytCity(City.getCitiesOfCountry(code));
    };

    const handleSelectCity = (e) => {
        setselectCity(e.target.value);
    };

    const hideDialogHandler = () => {
        setOpenDialog(false)
        navigate(-1);
    }

    useEffect(() => {
        if (cart.length == 0 && uid) {
            navigate('/')
        }
    }, []);


    const placeOrder = (e) => {
        e.preventDefault();



        if (cart.length == 0) {
            Swal.fire({
                customClass: {
                    container: `my-swal`,
                },
                icon: "error",
                title: "SPEED WORKS",
                html: `<strong><font color="black">Empty Cart</font></strong>`,
            });
        }
        else {

            if (address.trim().length == 0 || phoneno.length == 0 || shippingAddress.trim().length == 0 || postalCode.trim().length == 0) {
                Swal.fire({
                    customClass: {
                        container: `my-swal`,
                    },
                    icon: "error",
                    title: "SPEED WORKS",
                    html: `<strong><font color="black">Empty Input field</font></strong>`,
                });
            }
            else {
                if (phoneno.length < 11) {
                    Swal.fire({
                        customClass: {
                            container: `my-swal`,
                        },
                        icon: "error",
                        title: "SPEED WORKS",
                        html: `<strong><font color="black">Phone Number not Correct</font></strong>`,
                    });
                }
                else {
                    let orderItems = cart.map((val, i) => {
                        return {
                            quantity: val.quantity,
                            product: val.product
                        }
                    })
                    // confirmCheckout({
                    //     orderItems: orderItems,
                    //     shippingAddress1: address,
                    //     shippingAddress2: shippingAddress,
                    //     city: selectCity,
                    //     zip: postalCode,
                    //     country: countryName,
                    //     phone: phoneno,
                    //     user: localStorage.getItem('uid')
                    // }).then((res) => {
                    //     setCartEmpty();
                    //     setaddress('')
                    //     setphoneno('')
                    //     navigate('/my-orders')
                    // })
                }
            }
        }
    }

    const totalAmount = (arr) => {
        let total = 0;
        cart.forEach(element => {
            total += element?.price * element?.quantity
        });
        return total
    }

    let deliveryCharges = 100;


    const validatePhone = (e) => {
        let phonenumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
        let number = e.target.value;
        let lastNumber = Array.from(number)[number.length - 1];
        if (number.length == 0) {
            setphoneno(number)
        }
        else {
            if (number.length <= 11) {
                if (phonenumber.includes(Number(lastNumber))) {
                    setphoneno(number)
                }
            }
        }

    }


    return (
        <Container style={{ marginTop: '40px' }}>
            <Grid container spacing={4} >
                <Grid item xs={12} sm={12} md={8} >
                    <Grid container  >
                        <Grid item xs={12} >
                            <Box mb={3} mx={2} >
                                <Typography className={classes.breadCumbColor} variant='h6' >
                                    <Link style={{ color: "#007BFF", textDecoration: "none" }} to="/">
                                        Home
                                    </Link>
                                    <Link style={{ color: "#007BFF", textDecoration: "none" }} to="/cart" > / Cart </Link>
                                    / Checkout
                                </Typography>
                                <Divider />
                            </Box>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <Box m={2} style={{ width: "auto", margin:'20px 0px' }}>
                                <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Phone Number (Not convertable eg:- 03199999999) *
                                </Typography>
                                <OutlinedInput
                                    fullwidth
                                    className={classes.productInput}
                                    style={{ width: "100%" }}
                                    placeholder="031999999999"
                                    type="text"
                                    value={phoneno}
                                    onChange={(e) => validatePhone(e)}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={12} md={12}>
                            <Box m={2} style={{ width: "auto", margin:'20px 0px' }}>
                                <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Shipping Address 1 *
                                </Typography>
                                <OutlinedInput
                                    fullwidth
                                    className={classes.productInput}
                                    style={{ width: "100%" }}
                                    placeholder="House no 123 block-A  Area-Name City Pakistan"
                                    type="text"
                                    value={address}
                                    onChange={(e) => {
                                        setaddress(e.target.value)
                                    }}
                                />
                            </Box>
                        </Grid>
                        <Grid xs={12} md={12} style={{marginBottom:'20px'}} >
                            <Box m={2} style={{ width: "auto", margin:'20px 0px' }}>
                                <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Shipping Address 2 *
                                </Typography>
                                <OutlinedInput
                                    fullwidth
                                    className={classes.productInput}
                                    style={{ width: "100%" }}
                                    placeholder="House no 123 block-A  Area-Name City Pakistan"
                                    type="text"
                                    value={shippingAddress}
                                    onChange={(e) => {
                                        setshippingAddress(e.target.value)
                                    }}
                                />
                            </Box>
                        </Grid>

                        {/* <Grid xs={12} md={4}>
                            <Box m={2} style={{ width: "auto" }}>
                                <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Postal Code *
                                </Typography>
                                <OutlinedInput
                                    fullwidth
                                    className={classes.productInput}
                                    style={{ width: "100%" }}
                                    placeholder="1234"
                                    type="text"
                                    value={postalCode}
                                    onChange={(e) => {
                                        setpostalCode(e.target.value)
                                    }}
                                />
                            </Box>
                        </Grid> */}

                        <Grid item xs={12} md={6} style={{paddingRight:'50px'}} >
                            <Box m={2} style={{ width: "auto" }}>
                                <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    Country
                                </Typography>
                                <NativeSelect
                                    // id="demo-customized-select-native"
                                    style={{ width: "100%", marginTop: '15px' }}
                                    // input={<BootstrapInput />}
                                    onChange={(e) => handleSelectCountry(e)}
                                    value={selectCountry}
                                >
                                    {allCountries.map((val, i) => (
                                        <option key={i} value={val.isoCode} >
                                            {val.name}
                                        </option>
                                    ))}
                                </NativeSelect>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6} style={{paddingLeft:'50px'}} >
                            <Box m={2} style={{ width: "auto" }}>
                                <Typography style={{ fontSize: "12px", marginLeft: "3px" }}>
                                    City
                                </Typography>
                                <NativeSelect
                                    // id="demo-customized-select-native"
                                    style={{ width: "100%", marginTop: '15px' }}
                                    // input={<BootstrapInput />}
                                    onChange={(e) => handleSelectCity(e)}
                                    value={selectCity}
                                >
                                    {selectCountrytCity.map((val, i) => (
                                        <option key={i} value={val.name}>{val.name}</option>
                                    ))}
                                </NativeSelect>
                            </Box>
                        </Grid>
                        <Grid item xs={12} >
                            <Hidden smDown >
                                <Box m={2} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                                    <button className={classes.placeOrderBtn}
                                        onClick={placeOrder}
                                    >Place Order</button>
                                </Box>
                            </Hidden>
                        </Grid>

                    </Grid>
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
                            <div>
                                <Divider style={{ marginBottom: '10px' }} />
                                <div className={classes.alignItem} >
                                    <Typography>Total Amount</Typography>
                                    <Typography>{totalAmount(cart)}</Typography>
                                </div>
                            </div>
                        </div>
                        {/* <div style={{ display: 'flex', justifyContent: 'center' }} >
                            <Button className={classes.chekoutBtn} onClick={() => navigate('/checkout')} >Place Order</Button>
                        </div> */}
                    </Box>
                </Grid>
                <Grid item xs={12} >
                    <Hidden smUp >
                        <Box m={2} style={{ display: 'flex', justifyContent: 'flex-end' }} >
                            <Button className={classes.placeOrderBtn}
                                onClick={placeOrder}
                            >Place Order</Button>
                        </Box>
                    </Hidden>
                </Grid>
            </Grid>
        </Container>
    )
}


const mapStateToProps = (store) => ({
    currentUser: store.user.data,
    loading: store.user.loading,
    cart: store.user.cart,
});


const mapDispatchToProps = (dispatch) => ({
    setCartEmpty: () => dispatch(setCartEmpty()),
    // confirmCheckout: (data) => dispatch(confirmCheckout(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);