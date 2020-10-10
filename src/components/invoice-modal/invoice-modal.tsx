import * as React from "react";
import Modal from "react-modal";
import { globalContext } from "../../global-state-provider/global-state-provider";
import { HIDE_INVOICE_POPUP } from "../../global-state-provider/action-types";
import Util from "../../commons/util";


Modal.setAppElement("#root");

const InvoiceModal:React.SFC<{}> = () => {
    const { state, dispatch } = React.useContext(globalContext);
    const handleCloseModal = () => {
        dispatch({
            type: HIDE_INVOICE_POPUP
        })
    };

    const customStyles = {
        content: {
            left: '20%',
            right: '20%',
            bottom: "auto"
        }
    };


    return <Modal style={customStyles} isOpen={state.showInvoicePopup} onRequestClose={handleCloseModal} shouldCloseOnOverlayClick={false} shouldCloseOnEsc={false}>
        <div className="invoice-modal-cont">
            <h3 className="mtb-0">INVOICE</h3>
            <hr />
            <p>Invoice Number : {state.orderDetails?.invoiceNumber}</p>
            <p>Total Price : {Util.formatNumberToUSD(state.orderDetails?.totalPrice ? state.orderDetails.totalPrice : 0)}</p>
            <p>Discount Price : {Util.formatNumberToUSD(state.orderDetails?.discount ? state.orderDetails.discount : 0)}</p>
            <h4>Items</h4>
            <table className="styled-table">
                <thead>
                    <th>S.No</th>
                    <th>Product Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                </thead>
                <tbody>
                    {state.orderDetails?.products.map((p, index:number) => {
                        return <tr>
                            <td>{index+1}</td>
                            <td>{p.product.name}</td>
                            <td>{p.quantity}</td>
                            <td>{Util.formatNumberToUSD(p.quantity * p.product.price)}</td>
                        </tr>
                    })}
                </tbody>
            </table>
            <hr />
            <button type="button" onClick={handleCloseModal}>Close</button>
        </div>
    </Modal>
}

export default InvoiceModal;