import useProduct from "../hooks/useProduct";
import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {IMAGES_PATH} from "../model/aplication_properties";
import useShoppingCart from "../hooks/useShoppingCart";
import NavBar from "../components/NavBar";
import useAuth from "../hooks/useAuth";
import {getSizeOfShoppingCart} from "../api/ProductApi";

export default function ProductDetails() {

    const {id} = useParams();
    const [user] = useAuth();
    const[shoppingCart,setShoppingCart,sizeOfShoppingCart,setSizeOfShoppingCart] = useShoppingCart("shopping-cart");
    const [product,,isReady] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>("")

    let sidePhotos = product.imageIDs.map((img) => {

            return <div key={img} className={" card  border-5 side-photo "}>
                <img
                    src={IMAGES_PATH + img}
                    onClick={() => {
                        setPresentPhoto(IMAGES_PATH + img)
                    }} alt="..."/>
            </div>
        }
    )


    const addToCart = async () => {
        await axios.put("/api/products/orders/" + id);
        setShoppingCart([...shoppingCart,product])
        setSizeOfShoppingCart(-1)
    }
    const buyProduct = async () => {
       await axios.put("/api/products/" + id)
        setSizeOfShoppingCart(0)
    }

    useEffect(() => {
        (async () => {
            const sizOfShoppingCart = await getSizeOfShoppingCart()
            setSizeOfShoppingCart(sizOfShoppingCart)
        })();
    }, [sizeOfShoppingCart,setSizeOfShoppingCart]);



    return (<>

            <NavBar user={user} shoppingCartNum={sizeOfShoppingCart}/>
            {isReady ? <div>
                <div className={"photos-container"}>

                    {/*SIDE BAR PHOTOS*/}
                    <div>{sidePhotos}</div>

                    {/*THE PRESENT POSTER*/}
                    <img src={presentPhoto ? presentPhoto : IMAGES_PATH + (product.imageIDs[0])}
                         className="present-photo border border-5 " style={{width: "25rem"}}
                         alt={product.imageIDs[0]}/>

                    <div className={"text-buttons-container"}>
                        <h2>{product.name}</h2>
                        <p className={"description"}>Step into the season in style with our latest collection of
                            clothing.From flowy dresses to tailored suits, we have something for every occasion." </p>

                        {/*ADD TO CART BUTTON*/}
                        <div className={"details-button-container"}>

                            <button type="button" className="btn btn m-t-3 add-to-cart-button" onClick={addToCart}
                                    data-bs-toggle="modal" data-bs-target="#shopping-cart-added">
                                Add to Shopping cart
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
                            {/*BUY BUTTON */}
                            <div className={"details-button-container"}>

                                <button type="button" className="btn btn m-t-3 buy-button" onClick={buyProduct}
                                        data-bs-toggle="modal" data-bs-target="#order-button">
                                    Order now
                                </button>

                                <div className="modal fade" id="order-button" aria-labelledby="exampleModalLabel"
                                     aria-hidden="true">
                                    <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">

                                            <div className="modal-body">
                                                thank you for your order, you can find the Order in myOrder <div
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

                        </div>
                    </div>

                </div>
            </div>
                : <div className={"place-holder"}>Product Details loaded...</div>}
        </>
    )
}








