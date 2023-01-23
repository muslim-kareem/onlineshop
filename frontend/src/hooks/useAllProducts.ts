import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getProducts} from "../api/ProductApi";


export default function useAllProducts(initialState: Product[]): [Product[], Dispatch<SetStateAction<Product[]>>] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            const products = await getProducts();
            setProducts(products)
        })();
    }, []);

    return [products,setProducts];
}