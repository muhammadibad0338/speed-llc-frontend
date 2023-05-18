import * as React from 'react';
import * as MuiIcon from '@mui/icons-material';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CategoryIcon from '@mui/icons-material/Category';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import HistoryIcon from '@mui/icons-material/History';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { makeStyles } from "@material-ui/core/styles";

import { useNavigate, useLocation, } from 'react-router';

import { connect } from "react-redux";

import logo from '../Assets/logo.png'

import {
    // getCurrentUser
} from "../Redux/User/UserAction"
import Footer from './Footer';
import AccountMenu from './AccountMenu';

const drawerWidth = 240;

const styles = makeStyles((theme) => ({
    selectedListItem: {
        cursor: 'pointer',
        borderLeft: '4px solid #FF0000 !important',
        backgroundColor: '#EDEDED !important',
        borderRadius: '10px !important',

    },
    notSelectedListItem: {
        cursor: 'pointer',
        "&:hover": {
            borderBottom: '4px solid #FF0000 !important'
        },
    },
    cartLengthChip: {
        fontSize: '13px',
        fontWeight: 'bold',
        backgroundColor: 'red',
        color: 'white',
        position: 'absolute',
        right: '6px',
        top: '5px',
        padding: '2px',
        borderRadius: '9px',
        width: '19px',
        height: '22px'
    },
    loginHome: {
        backgroundColor: "black",
        marginRight: "5vw",
        color: "#FCBF10",
        padding: "0px 22px",
        borderRadius: "50px",
        "&:hover": {
            backgroundColor: "black",
            color: "#FCBF10",
        },
        [theme.breakpoints.down('md')]: {
            marginRight: "2vw",
            padding: "0px 12px",
        }
    },
    logo: {
        width: '70px',
        height: '40px',
        margin: '5px',
        [theme.breakpoints.down('xs')]: {
            width: '60px',
            height: '40px',
        }
    }
}));


function ResponsiveDrawer(props) {
    const classes = styles();
    const { window, children,
        cart,
        // getCurrentUser,
        currentUser, loading } = props;
    let uid = localStorage.getItem('uid');
    const [uidState, setUid] = React.useState(localStorage.getItem('uid'));
    const [mobileOpen, setMobileOpen] = React.useState(false);
    let { pathname } = useLocation();
    const [catId, setCatId] = React.useState(0);


    const navigate = useNavigate();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    React.useEffect(() => {
        // getCategories();
        if (uid) {
            // getCurrentUser(uid);
        }
    }, [])

    let categories = ['ALL', 'Batteries/Charges', 'Brakes', 'Engine', 'Fuel', 'Head/Porting Services']



    const drawer = (
        <div style={{ height: 'inherit', position: 'relative', display: 'flex', flexDirection: 'column' }} >
            <Toolbar />
            <Divider />
            <List style={{ marginTop: '10px', padding: '0px 10px' }} >
                <ListItem sx={{ display: { xs: 'block', sm: 'none' } }} >
                    <img className={classes.logo} src={logo} onClick={() => navigate('/')} />
                </ListItem>
                <ListItem >
                    <Typography style={{ fontWeight: 'bold', textTransform: 'uppercase', color: "#FF0000" }} variant="h5" >Category</Typography>
                </ListItem>
                {categories?.map((name, index) => {
                    return (
                        <ListItem className={catId === index ? classes.selectedListItem : classes.notSelectedListItem} key={index} onClick={() => {
                            // setCatId(index)
                        }
                        }
                        // className={catId == _id ? classes.selectedListItem : null}
                        >

                            <p style={{ fontSize: '16px', fontWeight: 'bold' }} >
                                {name}
                            </p>
                        </ListItem>
                    )
                }
                )}
            </List>
            <List style={{ marginBottom: '0px', position: 'fixed', width: drawerWidth, bottom: 0, backgroundColor: '#F7F7F7', borderTop: '1px solid #D9D9D9', borderRight: "1px solid #D9D9D9" }} >
                {/* <ListItem button onClick={() => navigate('/my-orders')} >
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    <ListItemText primary='Previous Orders' />
                </ListItem> */}
                {(localStorage.getItem('uid') || uidState) ? <ListItem button onClick={() => {
                    localStorage.removeItem('token')
                    localStorage.removeItem('uid')
                    localStorage.clear();
                    setUid(null);
                    navigate('/')

                }} >
                    <ListItemIcon style={{ color: 'red' }} >
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem> : <ListItem button onClick={() => navigate('/login')} >
                    <ListItemIcon style={{ color: 'red' }}  >
                        <LoginIcon />
                    </ListItemIcon>
                    <ListItemText primary="LogIn" />
                </ListItem>}
            </List>
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#F7F7F7' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#F7F7F7' }}>
                <Toolbar style={{ display: 'flex' }}>
                    {!props?.hideDrawer && <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#FE0000' }}
                    >
                        <MenuIcon />
                    </IconButton>}
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }} >
                        <img style={{ width: '80px', height: '50px', margin: '5px', cursor: 'pointer' }} src={logo} onClick={() => navigate('/')} />
                    </Box>
                    <Box style={{ marginLeft: 'auto' }} >
                        {(localStorage.getItem('uid') || uidState) && <>
                            {Object.keys(currentUser).length > 0 && <AccountMenu />}
                        </>}
                    </Box>
                    <IconButton aria-label="shopping Cart" component="span" style={{ height: '61px', width: '61px' }}
                        onClick={() => navigate('/cart')}
                    >
                        <span
                            className={classes.cartLengthChip}
                        >
                            {cart.length}
                        </span>
                        <ShoppingCartOutlinedIcon fontSize='large' style={{ color: 'black' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {!props?.hideDrawer && <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }, }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#F7F7F7' },
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: '#F7F7F7' },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>}
            <Box
                component="main"
                sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                {/* <Toolbar /> */}
                {children}
            </Box>
        </Box>
    );
}

ResponsiveDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

// export default ResponsiveDrawer;
const mapStateToProps = (store) => ({
    categories: store.user.categories,
    cart: store.user.cart,
    currentUser: store.user.currentUser,
    loading: store.user.loading
});


const mapDispatchToProps = (dispatch) => ({
    // getCurrentUser: (id) => dispatch(getCurrentUser(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);