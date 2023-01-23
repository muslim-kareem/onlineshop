import {Product} from "../model/Product";
import axios from "axios";

export const getProducts = async (): Promise<Product[]> => {
    const response = await axios.get<Product[]>('/api/products');
    return response.data;
};