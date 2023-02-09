import {useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getOrdered, getShoppingCart, getSizeOfShoppingCart} from "../api/ProductApi";


export default function useShoppingCart(order: string): [Product[], ((value: (((prevState: Product[]) => Product[]) | Product[])) => void), number, ((value: (((prevState: number) => number) | number)) => void)] {
    const [products, setProducts] = useState<Product[]>([]);
    const[sizeOfShoppingCart,setSizeOfShoppingCart] = useState(0)

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

    useEffect(() => {
        (async () => {
            const sizOfShoppingCart = await getSizeOfShoppingCart()
            setSizeOfShoppingCart(sizOfShoppingCart)
        })();
    }, [sizeOfShoppingCart]);


    return [products,setProducts,sizeOfShoppingCart,setSizeOfShoppingCart];
}