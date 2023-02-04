import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getOrdered, getShoppingCart} from "../api/ProductApi";


export default function useShoppingCart(order: string): [Product[], Dispatch<SetStateAction<Product[]>>] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {
            if(order === "shopping-cart"){
                const shoppingCart = await getShoppingCart()
                setProducts(shoppingCart)
            }
            if (order === "ordered"){
                const ordered = await getOrdered();
                setProducts(ordered)
            }
        })();
}, [order]);

    return [products,setProducts];
}