import {Product} from "../model/Product";
import ProductCard from "./ProductCard";

export default function ProductContainer({products}:{
    products:Product[]
}){


    return(

        <div className="product-container">
            <div className={"d-flex align-content-start flex-wrap  mb-5 "}>
            {products.map(p => <div className={"product-card"}><ProductCard  key={p.id} product={p}/></div>)}
            </div>
        </div>
    )
}