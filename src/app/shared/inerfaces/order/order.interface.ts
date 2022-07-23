import { IProductResponse } from "../product/product.interface";



export interface IOrderRequest {
    basket: Array<IProductResponse>;
    price: number;
    name: string;
    phoneNumber: string;
    address: string;
    status: string;
    payment: string;
}
export interface IOrderResponse {
    id: number;
    basket: Array<IProductResponse>;
    price: number;
    name: string;
    phoneNumber: string;
    address: string;
    status: string;
    payment: string;
}