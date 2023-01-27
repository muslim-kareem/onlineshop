import {Product} from "../model/Product";
import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";

export default function ShoppingCard({cartProducts,onRemove}:{
    onRemove: (id: string) => void
    cartProducts: Product[]

}){



    return (
        <>
            <ProductContainer >
                {cartProducts.map(p => <div key={p.id} className={"product-card"}><ProductCard  children={
                    <>
                    {/*REMOVE BUTTON*/}
                    <button type="button" className="btn  p-1 remove-button" onClick={()=> {onRemove(p.id)}}>Entfernen</button>
                    </>
                } product={p}/>


                </div>)}

            </ProductContainer>
        </>
    )
}