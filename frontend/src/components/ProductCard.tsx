import {Product} from "../model/Product";
import {IMAGES_PATH} from "../model/aplication_properties";
import {Link} from "react-router-dom";

export default function ProductCard({product,children}:{
    product: Product
    children: React.ReactNode


}){

    const convert = Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 2,

    });

    return(

        <div className="card" style={{width: "15rem"}}>
            <Link to={"/details/"+ product.id} ><img src={IMAGES_PATH+product.imageIDs[0]} className="card-img-top " alt="..."/></Link>
                <div className="card-body">
                    <div className={"price-title-container"}>
                        <p className={"title-card"}> {product.name}</p>
                        <p className={"price-card"}> {convert.format(product.price)}</p>
                    </div>
                    {children}
                </div>

        </div>
    )
}