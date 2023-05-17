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
}
    from "./UserTypes"


const initialState = {
    data: {},
    loading: false,
    updating: false,
    logged: false,
    error: null,
    authToken: "",
    passwordOtp: "",
    users: {},
    products: [],
    product: {},
    cart: [],
    categories: [],
    productLoading: false,
    currentUser: {}
};

const userReducer = (state = initialState, action) => {
    const { payload, type } = action;
    switch (type) {
        case SET_USER:
            return {
                ...state,
                data: payload,
                authToken: payload.token,
                updating: false,
                logged: true,
                loading: false,
            };
        case SET_CURRENT_USER:
            return{
                ...state,
                currentUser:payload
            }
        case SET_CART:
            return {
                ...state,
                cart: [...state.cart, payload]
            }
        case SET_CART_EMPTY:
            return{
                ...state,
                cart:[]
            }
        case ADD_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((val, i) => {
                    if (i == payload) {
                        return {
                            ...val,
                            quantity: val.quantity + 1
                        }
                    }
                    else {
                        return {...val}
                    }
                })
            }
        case SUB_QUANTITY:
            return {
                ...state,
                cart: state.cart.map((val, i) => {
                    if (i == payload) {
                        if(val?.quantity > 1)
                        {
                            return {
                                ...val,
                                quantity: val.quantity - 1
                            }
                        }
                        else{
                            return {...val}
                        }
                    }
                    else {
                        return {...val}
                    }
                })
            }
        case REMOVE_PRODUCT:
        return {
            ...state,
            cart: state.cart.filter((val,i)=>{
                return i !== payload
            })
        }
        case GET_ALL_PRODUCTS:
            return {
                ...state,
                products: payload
            }
        case GET_SINGLE_PRODUCTS:
            return {
                ...state,
                product: payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: !state.loading,
                error: null,
            };
        case SET_PRODUCT_LOADING:
            return{
                ...state,
                productLoading:payload,
                error:null,
            }
        case SET_ERROR:
            return {
                ...state,
                error: payload,
            };
        case SET_TOKEN:
            return {
                ...state,
                authToken: payload,
            };
        case SET_LOGOUT:
            return {
                ...state,
                data: {},
                cart:[],
                updating: false,
                logged: false,
                loading: false,
            };
        default:
            return state;
    }
};

export default userReducer;