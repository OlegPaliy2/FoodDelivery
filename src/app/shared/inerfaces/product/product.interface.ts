import {IShopResponse } from "../shop/shop.interface";

export interface IProductRequest {
    shop: IShopResponse;
    name: string;
    path: string;
    imagePath: string;
    description: string;
    price: number;
    weight: string;
    count: number;
}
export interface IProductResponse {
    id: number;
    shop: IShopResponse;
    name: string;
    path: string;
    imagePath: string;
    description: string;
    price: number;
    weight: string;
    count: number;
}