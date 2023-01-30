import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getProduct} from "../api/ProductApi";

const initialStait: Product = {
    id: "",
    name: "",
    description: "",
    price: 0.0,
    imageIDs: [],
    category: ""
}
export default function useProduct(productId: string): [Product, Dispatch<SetStateAction<Product>>] {
    const [product, setProduct] = useState<Product>(initialStait);

    useEffect(() => {
        (async () => {
            const product = await getProduct(productId)
            setProduct(product)
        })();
    }, [productId]);

    return [product,setProduct];
}