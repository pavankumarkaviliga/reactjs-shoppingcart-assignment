import * as React from "react";
import Modal from "react-modal";
import { globalContext } from "../../global-state-provider/global-state-provider";
import { HIDE_CART_POPUP, UPDATE_PRODUCT_QUANTITY, REMOVE_PRODUCT_FROM_CART, PLACE_ORDER, SHOW_INVOICE_POPUP } from "../../global-state-provider/action-types";
import Util from "../../commons/util";

import jpgImages from "../../assets/images/products/*.jpg";
import jpegImages from "../../assets/images/products/*.jpeg";
import { ICartItem } from "../../app-types";

Modal.setAppElement("#root");

export const CartModal: React.SFC<{}> = () => {
    const { state, dispatch } = React.useContext(globalContext);

    const handleCloseModal = () => {
        dispatch({
            type: HIDE_CART_POPUP
        })
    }

    const handlePlaceOrder = () => {
        handleCloseModal();
        dispatch({
            type: PLACE_ORDER,
            payload : {
                discount : getDiscountPrice(),
                totalPrice : getTotalPrice()
            }
        });
        dispatch({
            type : SHOW_INVOICE_POPUP
        })
    }
    

    const handleQtyChange = (id: number,quantity:number) => {
        if(isNaN(quantity)) return;

        dispatch({
            type: UPDATE_PRODUCT_QUANTITY,
            payload : {
                id,
                quantity
            }
        })
    }

    const getItemsTotalPrice = () => {
        let total = 0;
        state.cart.forEach((c) => {
            total += c.quantity * c.product.price;
        });
        return total;
    }

    const getDiscountPrice = () => {
        let total = getItemsTotalPrice();
        if(total > 50) {
            return total * (10/100);
        }
        return 0;
    }

    const getTotalPrice = () => {
       return getItemsTotalPrice() - getDiscountPrice();
    }

    const handleRemove = (cart : ICartItem) => {
        if(!state.cart.length) return;
        dispatch({
            type : REMOVE_PRODUCT_FROM_CART,
            payload : {
                id: cart.product.id
            }
        })
    };

    const customStyles = {
        content: {
            left: '10%',
            right: '10%',
            bottom: "auto"
        }
    };

    const handlePostModalOpen = () => {
        window.document.body.classList.add('overflow-hidden')
    }

    const handlePostModalClose = () => {
        window.document.body.classList.remove('overflow-hidden')
    }

    
    return <Modal onAfterOpen={handlePostModalOpen} onAfterClose={handlePostModalClose} style={customStyles} isOpen={state.showCartPopup} onRequestClose={handleCloseModal} shouldCloseOnOverlayClick={false} shouldCloseOnEsc={false}>
        <div className="cart-modal-container">
            <h4 style={{margin:0}}>MY CART({state.cart.length})</h4>
            <hr />
            <div className="cart-details">
                {state.cart.length ?
                <>
                <ul className="products">
                    {state.cart.map((cartItem) => {
                        return <li key={cartItem.product.id}>
                            <div className="image-cont" style={{width: '30%'}}>
                                <img style={{width: '100px', height : '100px'}} src={jpgImages[cartItem.product.id] ? jpgImages[cartItem.product.id] : jpegImages[cartItem.product.id]} alt="Product" />
                            </div>
                            <div className="details" style={{width: '50%'}}>
                                <h3>{cartItem.product.name}</h3>
                                <p>Category : {cartItem.product.category}</p>
                                <div className="quantity-cont">Quantity : <input type="number" min={1} max={10} value={cartItem.quantity} onChange={(e) => {handleQtyChange(cartItem.product.id, parseInt(e.target.value))}}/></div>
                                <p>Price : {Util.formatNumberToUSD(cartItem.quantity * cartItem.product.price)}</p>
                                <button type="button" onClick={() => {handleRemove(cartItem)}}>Remove</button>
                            </div>
                        </li>
                    })}
                    
                </ul>
                <div className="order-price-details">
                    <h4 style={{margin:0}}>Price Details</h4>
                    <hr />
                    <p>Price : {Util.formatNumberToUSD(getItemsTotalPrice())}</p>
                    <p>Discount : {Util.formatNumberToUSD(getDiscountPrice())} </p>
                    <p>Total Payable : {Util.formatNumberToUSD(getTotalPrice())}</p>
                    <button className="primary" onClick={handlePlaceOrder}>Place Order</button>
                </div>
                </> : 
                    <>
                        <p>Your cart become empty! Keep shopping.</p>
                    </>
                }
                
            </div>
            <hr />
            <button type="button" onClick={handleCloseModal}>Close</button> 
        </div>
    </Modal>
}

export default CartModal;