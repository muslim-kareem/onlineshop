import {Product} from "../model/Product";
import axios from "axios";
import {PRODUCT_BASE_URL} from "../model/aplication_properties";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(PRODUCT_BASE_URL);
    return response.data;
};

export const getSizeOfShoppingCart= async ()=> {
    const response = await axios.get(PRODUCT_BASE_URL+'/shopping-cart-size');
    return response.data;
};

export const getProductById = async (productId: string): Promise<Product> => {
    const response = await axios.get<Product>('/api/products/'+productId);
    return response.data;
};

export const getProductByCategory = async (category: string): Promise<Product[]> => {
    const response = await axios.get<Product[]>(PRODUCT_BASE_URL+'/category/'+category);
    return response.data;
};

export const getShoppingCart = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(PRODUCT_BASE_URL+'/shopping-carts');
    return response.data;
};

export const getOrdered= async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>(PRODUCT_BASE_URL+'/ordered');
    return response.data;
};

export const getOrderAll= async ()=> {
    const response = await axios.get(PRODUCT_BASE_URL+'/order-all');
    return response.data;
};
export const removeFromShoppingCart = async (productId: string): Promise<Product> => {
    const response = await axios.delete(PRODUCT_BASE_URL+'/shopping-carts/'+productId);
    return response.data;
};

export const removeOrdered = async (productId: string): Promise<Product> => {
    const response = await axios.delete(PRODUCT_BASE_URL+'/ordered/'+productId);
    return response.data;
};
export const deleteProduct = async (productId: string): Promise<Product> => {
    const response = await axios.delete<Product>(PRODUCT_BASE_URL+'/'+productId);
    return response.data;
};


export const getProductsByTitle = async (name: string): Promise<Product[]> => {
    const response = await axios.get(PRODUCT_BASE_URL+'/search-by-name/'+name);
    return response.data;
};
