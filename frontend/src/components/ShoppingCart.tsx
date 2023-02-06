import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import useShoppingCart from "../hooks/useShoppingCart";
import {removeFromShoppingCart} from "../api/ProductApi";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";
import React from "react";

export default function ShoppingCart(){

    const [shoppingCart,setShoppingCart] = useShoppingCart("shopping-cart");
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
                    <button type="button" className="btn  p-1 mt-2  shopping-cart-remove-button" onClick={() => {
                        onRemove(p.id)
                    }}>remove from shoppingCart</button>


                </div>)}

            </ProductContainer>
            {/*ADD TO CART BUTTON*/}
            <div className={"details-button-container"}>

                <button type="button" className="btn btn m-t-3 add-to-cart-button" onClick={( ) => {} }
                        data-bs-toggle="modal" data-bs-target="#shopping-cart-added">
                     Order all {shoppingCart.length} Products
                </button>

                <div className="modal fade" id="shopping-cart-added" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-body">
                                you have added the Product to your Shopping Cart <div
                                className="fa-sharp fa-solid fa-circle-check"></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/*---------------*/}

        </>
    )
}