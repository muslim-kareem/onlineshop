import {useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getProductById} from "../api/ProductApi";

const initialStait: Product = {
    id: "",
    name: "",
    description: "",
    price: 0.0,
    imageIDs: [],
    category: ""
}
export default function useProduct(productId: string): [Product, ((value: (((prevState: Product) => Product) | Product)) => void), boolean] {
    const[isReady,setIsReady] = useState(false)
    const [product, setProduct] = useState<Product>(initialStait);

    useEffect(() => {
        (async () => {
            try {
                const product = await getProductById(productId)
                setProduct(product)

            }catch (e){
                console.log("error : " + e)
            }finally {
                setIsReady(true)
            }

        })();
    }, [productId]);

    return [product,setProduct,isReady];
}