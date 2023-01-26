import useProduct from "../hooks/useProduct";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {IMAGES_PATH} from "../model/aplicationProp";
import axios from "axios";
export default function ProductDetails() {

    const {id} = useParams();
    const [product] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>("")


    let sidePhotos = product.imageURLs.map((img, index) => {

            return <div key={index} className={" card  border-5 side-photo " }>
                        <img
                            src={IMAGES_PATH + img}
                            onClick={() =>{
                            setPresentPhoto(IMAGES_PATH + img)
                        } } alt="..."/>
                  </div>
                }
             )


     const addToCart = async () => {
        await axios.put("/api/orders/"+id)
     }
     const buyProduct = async () => {
        await axios.put("/api/products/"+id)
     }

    return (<>


            <div>
                <div className={"photos-container"}>
                    <div>{sidePhotos}</div>

                        <img src={presentPhoto ? presentPhoto : IMAGES_PATH + product.imageURLs[0]}
                             className="present-photo " style={{width: "25rem"}} alt={product.imageURLs[0]}/>

                    <div className={"text-buttons-container"}>
                                <h2 >{product.name}</h2>
                        <p className={"description"}>Step into the season in style with our latest collection of
                            clothing.From flowy dresses to tailored suits, we have something for every occasion." </p>
                        <div className={"details-button-container"}>

                             {/*ADD TO CARD BUTTON*/}
                            <button type="button" className="btn btn m-t-3 add-to-cart-button" onClick={addToCart} data-bs-toggle="modal" data-bs-target="#exampleModal">
                                In den Warenkorb
                            </button>

                            <div className="modal fade" id="exampleModal"  aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">

                                        <div className="modal-body">
                                            Das Product wurde zu Warenkorb hnzugefügt
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">schließen</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*---------------*/}
                            <button className="btn buy-button" type="button" onClick={buyProduct}>Kaufen</button>

                        </div>
                    </div>

                </div>




            </div>


        </>
    )
}








