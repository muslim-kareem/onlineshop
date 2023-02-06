import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import useShoppingCart from "../hooks/useShoppingCart";
import {removeOrdered} from "../api/ProductApi";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";

export default function OrderedProducts(){
    const [orderedProduct,setOrderedProduct] = useShoppingCart("ordered");
    const [user] = useAuth();

    const onRemove = (id: string) => {
        const theNewShoppingCard = orderedProduct.filter(f => f.id !== id)
        removeOrdered(id);
        setOrderedProduct([...theNewShoppingCard])
    }

    return (
        <>
            <NavBar user={user}/>
            <ProductContainer >
                {orderedProduct.map(p => <div key={p.id} className={"product-card"}><ProductCard product={p}/>
                    {/*REMOVE BUTTON*/}
                     <button type="button" className="btn  p-1 mt-2  shopping-cart-remove-button" onClick={() => {
                        onRemove(p.id)
                    }}>remove from orders</button>
                </div>)}

            </ProductContainer>
        </>
    )
}