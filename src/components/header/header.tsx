import * as React from "react";
import { globalContext } from "../../global-state-provider/global-state-provider";
import { SHOW_CART_POPUP } from "../../global-state-provider/action-types";

export default function Header() {
    const {state, dispatch} = React.useContext(globalContext);

    const handleShowCartPopup = () => {
        if(!state.cart.length) return;
        dispatch({
            type : SHOW_CART_POPUP
        })
    }

    return <div className="header-container">
        <h3>SHOPPING CART</h3>
        <div className="global-controls">
            <span onClick={handleShowCartPopup}><i className="fi-xnluxl-shopping-cart"></i>Cart({state.cart.length})</span>
        </div>
    </div>
}