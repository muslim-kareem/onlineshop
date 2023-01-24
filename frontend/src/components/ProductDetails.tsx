import useProduct from "../hooks/useProduct";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {IMAGES_PATH} from "../model/aplicationProp";
import axios from "axios";

export default function ProductDetails() {


    const {id} = useParams();
    const [product] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>("")
    const [activeSidePhoto,setActiveSidePhoto] = useState("")

    const onClick = () => {

    }

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
         const res = await axios.post("/api/app-users/ToDo/"+id)
     }

    return (<>


            <div className={"details-container"}>
                <div className={" d-flex justify-content-around flex-wrap "}>
                    <div>{sidePhotos}</div>
                    <div className=" present-photo-container border border-5 " style={{width: "25rem"}}>
                        <img src={presentPhoto ? presentPhoto : IMAGES_PATH+product.imageURLs[0]} className="present-photo " alt={product.imageURLs[0]}/>
                    </div>
                </div>
            </div>
            <div className={"details-button-container "}>
                <div className={"description"}>"Live, Laugh, Love"
                    "Adventure is out there"
                    "Life is better with a dog"

                    </div>

                <button className="btn add-to-cart-button" type="button">In den Warenkorb</button>
                <button className="btn buy-button" type="button" onClick={addToCart} >Kaufen</button>
            </div>

        </>
    )
}