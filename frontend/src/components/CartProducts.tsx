import {Product} from "../model/Product";
import ProductContainer from "./ProductContainer";

export default function CartProducts({cartProducts}:{
    cartProducts: Product[]

}){



    return (
        <>
          <ProductContainer products={cartProducts}/>
        </>
    )
}