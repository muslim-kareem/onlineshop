import useProduct from "../hooks/useProduct";
import {NavLink, useParams} from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import {IMAGES_PATH} from "../model/aplication_properties";
import useShoppingCart from "../hooks/useShoppingCart";

export default function ProductDetails() {

    const {id} = useParams();
    const[shoppingCart,setShoppingCart] = useShoppingCart();
    const [product] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>("")

    let sidePhotos = product.imageIDs.map((img, index) => {

            return <div key={index} className={" card  border-5 side-photo "}>
                <img
                    src={IMAGES_PATH + img}
                    onClick={() => {
                        setPresentPhoto(IMAGES_PATH + img)
                    }} alt="..."/>
            </div>
        }
    )


    const addToCart = async () => {
        await axios.put("/api/orders/" + id);
        setShoppingCart([...shoppingCart,product])

    }
    const buyProduct = async () => {
       await axios.put("/api/products/" + id)
    }

    return (<>


            <div>
                <div className={"photos-container"}>

                    {/*SIDE BAR PHOTOS*/}
                    <div>{sidePhotos}</div>

                    {/*THE PRESENT POSTER*/}
                    <img src={presentPhoto ? presentPhoto : IMAGES_PATH + product.imageIDs[0]}
                         className="present-photo border border-5 " style={{width: "25rem"}} alt={product.imageIDs[0]}/>

                    <div className={"text-buttons-container"}>
                        <h2>{product.name}</h2>
                        <p className={"description"}>Step into the season in style with our latest collection of
                            clothing.From flowy dresses to tailored suits, we have something for every occasion." </p>

                        {/*ADD TO CART BUTTON*/}
                        <div className={"details-button-container"}>

                            <button type="button" className="btn btn m-t-3 add-to-cart-button" onClick={addToCart}
                                    data-bs-toggle="modal" data-bs-target="#shopping-cart-added">
                                In den Warenkorb
                            </button>

                            <div className="modal fade" id="shopping-cart-added" aria-labelledby="exampleModalLabel"
                                 aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div className="modal-body">
                                            Das Product wurde zu Warenkorb hnzugefügt <div
                                            className="fa-sharp fa-solid fa-circle-check"></div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary"
                                                    data-bs-dismiss="modal">schließen
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*---------------*/}

                            {/*BUY BUTTON */}
                            <NavLink to={"/thankPage"}>
                                <button className="btn buy-button" type="button" onClick={buyProduct}>Bestellen</button>
                            </NavLink>
                            {/*---------------*/}

                        </div>
                    </div>

                </div>

            </div>

        </>
    )
}








