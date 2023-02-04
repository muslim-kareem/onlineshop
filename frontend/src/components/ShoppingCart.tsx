import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import useShoppingCart from "../hooks/useShoppingCart";
import {removeFromShoppingCart} from "../api/ProductApi";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";
import {useParams} from "react-router-dom";

export default function ShoppingCart(){
    const {name} = useParams();
    console.log(name)
    const [shoppingCart,setShoppingCart] = useShoppingCart(name as string);
    const [user] = useAuth();

    const onRemove = (id: string) => {
        const theNewShoppingCard = shoppingCart.filter(f => f.id !== id)
        removeFromShoppingCart(id);
        setShoppingCart([...theNewShoppingCard])
    }

    return (
        <>
            <NavBar user={user}/>
            <ProductContainer >
                {shoppingCart.map(p => <div key={p.id} className={"product-card"}><ProductCard  children={
                    <>

                    </>
                } product={p}/>
                    {/*REMOVE BUTTON*/}
                    {name === "shopping-cart" ?<button type="button" className="btn  p-1 mt-2  shopping-cart-remove-button" onClick={() => {
                        onRemove(p.id)
                    }}>remove from shoppingCart</button>: ""}


                </div>)}

            </ProductContainer>
        </>
    )
}