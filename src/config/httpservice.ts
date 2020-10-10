import axios, {AxiosInstance, AxiosRequestConfig} from "axios";
import {baseUrl} from "../config/endpoints";

export default class HttpService{
    private instance:AxiosInstance;

    public constructor(){
        this.instance = axios.create({
            baseURL : baseUrl
        });
    }

    public get(url:string, config ?: AxiosRequestConfig){
        return this.instance.get(url, config);
    }

    public post(url: string, data: any, config?: AxiosRequestConfig) {
        return this.instance.post(url, data, config);
    }

    
}