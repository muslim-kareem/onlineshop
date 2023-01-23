import {Product} from "../model/Product";
import img from './images/img.png';
export default function ProductCard({product}:{
    product: Product
}){
    return(

        <div className="card" style={{width: "18rem"}}>
            <img src={img} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <p> {product.name}</p>
                    <p> {product.price}</p>
                    <p> {product.description}</p>
                </div>
        </div>
    )
}