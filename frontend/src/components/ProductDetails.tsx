import useProduct from "../hooks/useProduct";
import {useParams} from "react-router-dom";
import {useState} from "react";

export default function ProductDetails() {


    const {id} = useParams();
    const [product] = useProduct(id as string);
    const [presentPhoto, setPresentPhoto] = useState<string>(product.imageURLs[0])


    let sidPhotos = product.imageURLs.map((img, index) => {
            if (img !== presentPhoto ) {
                return <div key={index} className=" card border border-5 side-photo"  >
                    <img src={img}   alt="..."/>
                </div>
            }

        }
    )

    console.log(product.imageURLs[0])

    return (<>
            <div className={"details-container"}>
            <div className={" d-flex justify-content-around " }>

                <div>{sidPhotos}</div>
                <div className=" present-photo-container " style={{width: "20rem"}}>
                    <img src={presentPhoto ? presentPhoto : "https://i.otto.de/i/otto/60d4d299-7438-517e-b227-b191335a6477?w=1385&h=2000"} className="present-photo " alt="..."/>
                </div>
            </div>

            </div>
        </>
    )
}