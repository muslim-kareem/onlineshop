import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getAddedToCartProducts, getProducts} from "../api/ProductApi";


export default function useProducts(areExcuted: boolean): [Product[], Dispatch<SetStateAction<Product[]>>] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            if(areExcuted){
                const products = await getAddedToCartProducts()
                setProducts(products)
            }else {
                const products = await getProducts()
                setProducts(products)
            }
        })();
    }, [areExcuted]);

    return [products,setProducts];
}