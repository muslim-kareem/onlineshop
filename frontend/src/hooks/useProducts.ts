import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getAddedToCardProducts, getProducts} from "../api/ProductApi";


export default function useProducts(areExcuted: boolean): [Product[], Dispatch<SetStateAction<Product[]>>] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            if(areExcuted){
                const products = await getAddedToCardProducts()
                setProducts(products)
            }else {
                const products = await getProducts()
                setProducts(products)
            }
        })();
    }, [products,areExcuted]);

    return [products,setProducts];
}