import useProduct from "../hooks/useProduct";
import {useParams} from "react-router-dom";
import {useState} from "react";
import {IMAGES_PATH} from "../model/aplicationProp";

export default function ProductDetails() {


    const {id} = useParams();
    const [product] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>("")

    const onClick = () => {

    }

    let sidPhotos = product.imageURLs.map((img, index) => {

            return <div key={index} className=" card border border-5 side-photo">
                <img src={IMAGES_PATH + img} onClick={() => setPresentPhoto(IMAGES_PATH + img)} alt="..."/>
            </div>


        }
    )


    return (<>
            <div className={"details-container"}>
                <div className={" d-flex justify-content-around flex-wrap "}>
                    <div>{sidPhotos}</div>
                    <div className=" present-photo-container " style={{width: "25rem"}}>
                        <img src={presentPhoto ? presentPhoto : IMAGES_PATH+product.imageURLs[0]} className="present-photo "
                             alt="..."/>
                    </div>
                </div>

            </div>
        </>
    )
}