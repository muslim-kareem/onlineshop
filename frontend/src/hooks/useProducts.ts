import {useEffect, useState} from "react";
import {Product} from "../model/Product";
import {getProductsByTitle, getProducts} from "../api/ProductApi";


export default function useProducts(name: string): [Product[], ((value: (((prevState: Product[]) => Product[]) | Product[])) => void), boolean] {
    const [products, setProducts] = useState<Product[]>([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        (async () => {
           try{

           // && name.toLowerCase() === name
            if (name.length > 0 ) {
                const products = await getProductsByTitle(name)
                setProducts(products)
            }else {
                const products = await getProducts();
                setProducts(products)
            }
           }catch (e){
               console.log("error : " + e)
           }finally {
               setIsReady(true)
           }


        })();
    }, [name]);
    return [products,setProducts,isReady];
}