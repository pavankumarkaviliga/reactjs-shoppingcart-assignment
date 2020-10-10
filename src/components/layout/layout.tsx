import * as React from "react";
import Header from "../header/header";
import ProductList from "../product-list/product-list";
import Sidebar from "../sidebar/sidebar";


export default function Layout() {
    return <div className="container">
        <nav><Header /></nav>
        <main><ProductList /></main>
        <Sidebar />
    </div>
}