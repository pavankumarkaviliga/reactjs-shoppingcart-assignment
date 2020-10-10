import * as React from "react";
import { IProduct } from "../../../app-types";
import Util from "../../../commons/util";
import jpgImages from "../../../assets/images/products/*.jpg|jpeg";
import jpegImages from "../../../assets/images/products/*.jpeg";
import { globalContext } from "../../../global-state-provider/global-state-provider";
import { ADD_TO_CART } from "../../../global-state-provider/action-types";


export interface IProductListItemProps {
    product: IProduct
}

export default function ProductListItem({ product }: IProductListItemProps) {
    const { dispatch } = React.useContext(globalContext);

    const handleAddToCart = () => {
        dispatch({
            type : ADD_TO_CART,
            payload : product
        })
    };

    return <><div className="image-cont">
        <img src={jpgImages[product.id] ? jpgImages[product.id] : jpegImages[product.id]} alt="Product" />
    </div>
        <div className="details-cont">
            <h3 className="product-name">{product.name}</h3>
            <ul className="features">
                <li>Category : {product.category}</li>
                <li>Feature -2</li>
                <li>Feature -3</li>
            </ul>
            <div className="buy-buttons">
                <button className="primary" type="button" onClick={handleAddToCart}><i className="fi-cnluxl-plus"></i>&nbsp;Add to Cart</button>
            </div>
        </div>
        <div className="price-cont">
            <h2 className="product-price">{Util.formatNumberToUSD(product.price)}</h2>
        </div></>
}