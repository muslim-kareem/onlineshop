import {Product} from "../model/Product";
import axios from "axios";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products');
    return response.data;
};

export const getProduct = async (productId: string): Promise<Product> => {
    const response = await axios.get<Product>('/api/products/'+productId);
    return response.data;
};

export const getAddedToCartProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products/addedToCartProducts');
    return response.data;
};
