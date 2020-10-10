import HttpService from "../../config/httpservice";
import { IProduct } from "../../app-types";
import { GET_PRODUCTS } from "../../config/endpoints";
import { AxiosResponse } from "axios";

export const getProducts = (): Promise<IProduct[]> => {
    const httpservice = new HttpService();
    return httpservice.get(GET_PRODUCTS).then(({ data }: AxiosResponse) => {
        return data;
    });

}