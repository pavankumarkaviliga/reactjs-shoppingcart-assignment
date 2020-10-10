import { IAction, IInitialState, IOrderDetails } from "../app-types";
import * as actionTypes from "./action-types";
import Util from "../commons/util";

export default (state: IInitialState, action: IAction) => {
    switch (action.type) {
        case actionTypes.SET_PRODUCTS_LIST: {
            const copyState = { ...state };
            copyState.products = action.payload;
            copyState.productsOriginal = [...copyState.products]
            return copyState;
        }

        case actionTypes.ADD_TO_CART: {
            const product = action.payload;
            const cartCopy = [...state.cart];
            let productExistInCart = false;

            // find and update the product quantity in cart
            for(let i=0; i<cartCopy.length; i++){
                const cartItem = cartCopy[i];
                if(cartItem.product.id === product.id) {
                    cartItem.quantity++;
                    productExistInCart = true;
                    break;
                }
            }

            // else add a new cart item for this product
            if(!productExistInCart) {
                cartCopy.push({
                    quantity : 1,
                    product
                })
            }

            return {...state, cart : cartCopy};
        }

        case actionTypes.SHOW_CART_POPUP: {
            const copyState = { ...state };
            copyState.showCartPopup = true;
            return copyState;
        }

        case actionTypes.HIDE_CART_POPUP: {
            const copyState = { ...state };
            copyState.showCartPopup = false;
            return copyState;
        }

        case actionTypes.SHOW_INVOICE_POPUP: {
            const copyState = { ...state };
            copyState.showInvoicePopup = true;
            return copyState;
        }

        case actionTypes.HIDE_INVOICE_POPUP: {
            const copyState = { ...state };
            copyState.showInvoicePopup = false;
            return copyState;
        }


        case actionTypes.UPDATE_PRODUCT_QUANTITY: {
            const cartCopy = state.cart.map((cartItem) => {
                if(cartItem.product.id  ===  action.payload.id) {
                    cartItem.quantity = action.payload.quantity;
                }
                return cartItem;
            });

            return {...state, cart: cartCopy};
        }

        case actionTypes.REMOVE_PRODUCT_FROM_CART: {
            const filteredCart = state.cart.filter((cartItem) => cartItem.product.id !== action.payload.id);
            return { ...state, cart: filteredCart };
        }

        case actionTypes.PLACE_ORDER: {
            const cartCopy = [...state.cart];
            const orderDetails:IOrderDetails = {
                invoiceNumber : Util.generateInvoiceNumber(8),
                products : cartCopy,
                discount : action.payload.discount,
                totalPrice : action.payload.totalPrice
            }
            return { ...state, cart: [], orderDetails };
        }

        default:
            throw new Error();
    };
}