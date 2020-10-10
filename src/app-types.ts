export interface IProduct {
    id : number;
    name : string;
    category : string;
    price : number;
    image : string;
}

export interface ICartItem {
    product: IProduct;
    quantity: number;
}

export interface IInitialState {
    cart: ICartItem[];
    products: IProduct[];
    productsOriginal: IProduct[];
    showCartPopup : boolean;
    orderDetails : IOrderDetails | null;
    showInvoicePopup : boolean;
}

export interface IAction {
    type : string;
    [key:string] : any;
}


export interface IOrderDetails {
    invoiceNumber : number;
    products : ICartItem[];
    discount : number;
    totalPrice : number;
}