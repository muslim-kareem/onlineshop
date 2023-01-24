import {Product} from "../model/Product";
import img from './images/img.png';
import {IMAGES_PATH} from "../model/aplicationProp";

export default function ProductCard({product}:{
    product: Product
}){
    return(

        <div className="card" style={{width: "15rem"}}>
            <a href={"/details/"+ product.id} ><img src={IMAGES_PATH+product.imageURLs[0]} className="card-img-top" alt="..."/></a>
                <div className="card-body">
                    <p> {product.name}</p>
                    <p> {product.price}</p>
                    <p> {product.description}</p>
                </div>
        </div>
    )
}