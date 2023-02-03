import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getByTitle, getProducts} from "../api/ProductApi";


export default function useProducts(name: string): [Product[], Dispatch<SetStateAction<Product[]>>] {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        (async () => {

            if (name.length > 0){
                const products = await getByTitle(name)
                setProducts(products)
            }else {
                const products = await getProducts();
                setProducts(products)
            }

        })();
    }, [name]);
    return [products,setProducts];
}