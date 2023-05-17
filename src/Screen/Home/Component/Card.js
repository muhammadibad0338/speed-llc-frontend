import React from 'react'
import {
    Box,
    Typography,
    Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { useNavigate } from 'react-router';
import { Link } from "react-router-dom"

const styles = makeStyles((theme) => ({
    prodctImage: {
        maxWidth: '100%',
        height: '300px',
        display: 'block',
        marginLeft: 'auto',
        marginRight: 'auto'

    },
    productCard: {
        height: '450px',
        margin: '10px 10px',
        backgroundColor: 'inherit',
        padding: '0px',
        cursor:'pointer',
        backgroundColor:'white',
        transition: 'transform .2s',
        "&:hover": {
            boxShadow: "0 2px 5px 0 rgba(0, 0, 0, .25), 0 3px 10px 4px rgba(0, 0, 0, 0.3) !important;",
            transform: 'scale(1.1)',
        },
    },
    price: {
        fontWeight: "bold"
    },
    postBtn: {
        backgroundColor: "#FF0000",
        color: "white",
        marginLeft: 'auto',
        "&:hover": {
            backgroundColor: "#FF0000",
            color: "white",

        },
    }
}));

const Card = (props) => {

    const classes = styles();

    const navigate = useNavigate();

    const calculateDiscount = (discount, amount) => {
        let onePerc = amount / 100;
        let discountPerc = onePerc * discount;
        return   amount -discountPerc;
    }

    const calculateWithoutDiscount = (discount, amount) => {
        let remainPerc = 100 - discount;
        let perc = amount * 100;
        return   perc / remainPerc;
    }

    return (
        <Box my={2} className={classes.productCard} >
            <img className={classes.prodctImage} src={props?.image} alt="Product Image" />
            <Box
                mx={3}
            component="div"
            sx={{
                whiteSpace: 'nowrap',
                width: { xs: '150px', sm: 'auto' },
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                my: 1,
            }}
            >
                <Typography variant='h5' style={{ margin: '10px 0px',color:'#FF0000' }}  >{props?.name}</Typography>
            </Box>
            <Box style={{margin:'0px 24px'}} >
                {props?.discount == 0 && <Typography variant="h6" className={classes.price} >
                    Rs. {props?.price}
                </Typography>}
                {props?.discount > 0 && <Typography variant='h6' style={{fontWeight:'bold'}} > 
                 <span style={{color:'gray',textDecorationLine:'line-through',fontWeight:'bold'}} >Rs. {calculateWithoutDiscount(props.discount,props.price)} </span> <span style={{marginLeft:'10px'}} > Rs. {props.price} </span> </Typography> }
            </Box>
            <Box style={{ display: "flex" }} mr={3}  >
                <Button onClick={() => navigate(`/product/${props.id}`)} className={classes.postBtn} >
                    View 
                </Button>
            </Box>
        </Box>
    )
}

export default Card
