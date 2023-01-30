import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getAddedToCartProducts} from "../api/ProductApi";


export default function useShoppingCart(): [Product[], Dispatch<SetStateAction<Product[]>>] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
                const products = await getAddedToCartProducts()
                setProducts(products)
        })();
}, []);

    return [products,setProducts];
}