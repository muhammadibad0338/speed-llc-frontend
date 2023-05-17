import axios from "axios";
import { baseUrl } from "../baseUrl";
import {
    SET_USER,
    SET_CURRENT_USER,
    SET_LOADING,
    SET_PRODUCT_LOADING,
    SET_ERROR,
    SET_TOKEN,
    SET_LOGOUT,
    GET_ALL_PRODUCTS,
    GET_SINGLE_PRODUCTS,
    SET_CART,
    ADD_QUANTITY,
    REMOVE_PRODUCT,
    SUB_QUANTITY,
    SET_CART_EMPTY
} from "./UserTypes"
import Swal from "sweetalert2";


export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user,
    };
};

export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user,
    };
};


export const setToken = (token) => {
    return {
        type: SET_TOKEN,
        payload: token,
    };
};

export const getAllProducts = (allProducts) => {
    return {
        type: GET_ALL_PRODUCTS,
        payload: allProducts,
    };
};

export const getProduct = (product) => {
    return {
        type: GET_SINGLE_PRODUCTS,
        payload: product,
    };
};


export const setLoading = () => {
    return {
        type: SET_LOADING,
    };
};

export const setErrors = (errors) => {
    return {
        type: SET_ERROR,
        payload: errors,
    };
};


export const setLogout = () => {
    return {
        type: SET_LOGOUT,
    };
};



export const setCart = (cart) => {
    return {
        type: SET_CART,
        payload: cart
    }
}


export const addQuantity = (index) => {
    return {
        type: ADD_QUANTITY,
        payload: index
    }
}



export const subQuantity = (index) => {
    return {
        type: SUB_QUANTITY,
        payload: index
    }
}

export const removeCartProduct = (index) => {
    return {
        type: REMOVE_PRODUCT,
        payload: index
    }
}
export const setCartEmpty = () => {
    return {
        type: SET_CART_EMPTY,
    }
}


export const loginUser = (email, password) => async (dispatch) => {
    try {
        dispatch(setLoading(true));
        let res = await axios({
            url: `${baseUrl}/auth/login`,
            method: "POST",
            data: {
                email,
                password,
            },
        });
        localStorage.setItem("token", res?.data?.tokens.access.token);
        localStorage.setItem("uid", res?.data?.user?.id);
        localStorage.setItem("refreshToken", res?.data?.tokens.refresh.token)
        dispatch(setToken(res?.data?.tokens.access.token));
        dispatch(setUser(res.data));
        dispatch(setLoading());
        return res
    } catch (err) {
        Swal.fire({
            customClass: {
                container: `my-swal`,
            },
            icon: "error",
            title: "SPEED WORKS",
            html: `<strong><font color="black">${err?.response?.data}</font></strong>`,
        });
        dispatch(setErrors(err?.message));
        dispatch(setLoading());
        console.log("user login err", err)
        return null
    }
};

export const registerUser = (data) => async (dispatch) => {
    try {
      dispatch(setLoading());
      let res = await axios({
        url: `${baseUrl}/auth/register`,
        method: "POST",
        data: data
      });
      await Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "success",
        title: "SPEED WORKS",
        html: `<strong><font color="black">User Created Sucessfully</font></strong>`
      });
      dispatch(setLoading());
      return res
    } catch (err) {
      Swal.fire({
        customClass: {
          container: `my-swal`,
        },
        icon: "error",
        title: "SPEED WORKS",
        html: `<strong><font color="black">${err?.response?.data?.message || err?.response?.data  }</font></strong>`,
      });
      console.log("signup", err)
      dispatch(setErrors(err));
      dispatch(setLoading());
      return null
    }
  };