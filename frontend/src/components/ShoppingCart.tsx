import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import useShoppingCart from "../hooks/useShoppingCart";
import {getOrderAll, removeFromShoppingCart} from "../api/ProductApi";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function ShoppingCart(){

    const [shoppingCart,setShoppingCart] = useShoppingCart("shopping-cart");
    const [user] = useAuth();
    const navigate = useNavigate();

    const onRemove = (id: string) => {
        const theNewShoppingCard = shoppingCart.filter(f => f.id !== id)
        removeFromShoppingCart(id);
        setShoppingCart([...theNewShoppingCard])
    }


    const onOrderAll = () => {
        getOrderAll();
        setShoppingCart([])
        navigate("/ordered")
    }

    return (
        <>
            <NavBar user={user}/>
            <ProductContainer >
                {shoppingCart.map(p => <div key={p.id} className={"product-card"}><ProductCard product={p}/>
                    {/*REMOVE BUTTON*/}
                    <button type="button" className="btn  p-1 mt-2  shopping-cart-remove-button" onClick={() => {
                        onRemove(p.id)
                    }}>remove from shoppingCart</button>


                </div>)}

            </ProductContainer>

            {/*ORDER ALL BUTTON*/}

                <button type="button" className="btn btn-danger float-end me-5 " onClick={onOrderAll}
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
                {/*---------------*/}

        </>
    )
}