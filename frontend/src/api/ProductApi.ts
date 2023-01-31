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
    const response = await axios.get<Product[]>('/api/products/shopping-carts');
    return response.data;
};

export const removeFromShoppingCart = async (productId: string): Promise<Product> => {
    const response = await axios.delete('/api/products/shopping-carts/'+productId);
    return response.data;
};
export const deleteProduct = async (productId: string): Promise<Product> => {
    const response = await axios.delete<Product>('/api/products/'+productId);
    return response.data;
};