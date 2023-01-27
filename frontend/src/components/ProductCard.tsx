import {Product} from "../model/Product";
import {IMAGES_PATH} from "../model/aplicationProp";

export default function ProductCard({product,children}:{
    product: Product
    children: React.ReactNode
}){
    return(

        <div className="card" style={{width: "15rem"}}>
            <a href={"/details/"+ product.id} ><img src={IMAGES_PATH+product.imageURLs[0]} className="card-img-top" alt="..."/></a>
                <div className="card-body  pl .1">
                    <p> {product.name}</p>
                    <p className={"price-card"}> {product.price}</p>
                    {children}
                </div>

        </div>
    )
}