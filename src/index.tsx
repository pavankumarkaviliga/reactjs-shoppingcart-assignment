import React from 'react';
import { render } from 'react-dom';
import "./assets/styles/style.css";
import Layout from "./components/layout/layout";
import { GlobalContextProvider } from "./global-state-provider/global-state-provider";
import CartModal from "./components/cart-modal/cart-modal";
import InvoiceModal from "./components/invoice-modal/invoice-modal";

const Application: React.SFC<{}> = () => (
    <GlobalContextProvider>
        <Layout />
        <CartModal />
        <InvoiceModal />
    </GlobalContextProvider>
);

render(<Application />, document.getElementById('root'));