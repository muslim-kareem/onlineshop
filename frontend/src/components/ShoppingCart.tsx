import ProductContainer from "./ProductContainer";
import ProductCard from "./ProductCard";
import useShoppingCart from "../hooks/useShoppingCart";
import {getOrderAll, removeFromShoppingCart} from "../api/ProductApi";
import NavBar from "./NavBar";
import useAuth from "../hooks/useAuth";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function ShoppingCart(){
    const [shoppingCart,setShoppingCart,sizeOfShoppingCart,setSizeOfShoppingCart] = useShoppingCart("shopping-cart");
    const [user] = useAuth();
    const navigate = useNavigate();

    const onRemove = (id: string) => {
        const theNewShoppingCard = shoppingCart.filter(f => f.id !== id)
        removeFromShoppingCart(id);
        setShoppingCart([...theNewShoppingCard])
        setSizeOfShoppingCart(shoppingCart.length -1)
    }


    const onOrderAll = () => {
        getOrderAll();
        setShoppingCart([...shoppingCart])
        navigate("/")
        setSizeOfShoppingCart(1)
    }
    return (
        <>
            <NavBar user={user} shoppingCartNum={sizeOfShoppingCart}/>
             <ProductContainer >
                {shoppingCart.map(p => <div key={p.id} className={"product-card"}><ProductCard product={p}/>
                    {/*REMOVE BUTTON*/}
                    <button type="button" className="btn  p-1 mt-2  shopping-cart-remove-button" onClick={() => {
                        onRemove(p.id)
                    }}>remove from shoppingCart</button>


                </div>)}

            </ProductContainer>

            {/*ORDER ALL BUTTON*/}

            {shoppingCart.length > 0 ?
            <div>
                <button type="button" className="btn btn-danger float-end me-5 " onClick={onOrderAll}
                        data-bs-toggle="modal" data-bs-target="#shopping-cart-added">

                    {shoppingCart.length > 1 ? ("Order all " +shoppingCart.length+" Products now") :  "Order now"}
                </button>

                <div className="modal fade" id="shopping-cart-added" aria-labelledby="exampleModalLabel"
                     aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-body">
                                thank you for your order! <br/>
                                you can find the ordered Products in myOrder
                                <div className="fa-sharp fa-solid fa-circle-check"></div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary"
                                        data-bs-dismiss="modal">close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                </div>:
            <div className={"place-holder"}>No Products added to shopping</div>
            }
                {/*---------------*/}

        </>
    )
}