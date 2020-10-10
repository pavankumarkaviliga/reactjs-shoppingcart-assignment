import * as React from "react";
import ProductListItem from "./product-list-item/product-list-item";
import { getProducts } from "./apis";
import { IProduct } from "../../app-types";
import { globalContext } from "../../global-state-provider/global-state-provider";
import { SET_PRODUCTS_LIST } from "../../global-state-provider/action-types";

export default function ProductList() {
    const { state, dispatch } = React.useContext(globalContext);

    React.useEffect(() => {
        getProducts().then((products: IProduct[]) => {
            dispatch({
                type: SET_PRODUCTS_LIST,
                payload: products
            })
        });
    }, []);

    return <>
        <div className="products-list-header">
            <h4>Showing {state.products.length} products in All Categories</h4>
            <div className="sortby-options">
                <div>Sort By</div>
                <div>Price - Low to High</div>
                <div>Price - High to Low</div>
            </div>
        </div>
        <div className="products-list-container">
            <ul className="products-list">
                {state.products.map((product:IProduct) => {
                    return <li key={product.id}>
                        <ProductListItem product={product}/>
                    </li>
                })}

            </ul>
        </div>
    </>
}