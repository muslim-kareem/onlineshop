import useProducts from "../hooks/useProducts";
import ProductContainer from "../components/ProductContainer";
import LogoutButton from "../components/LogoutButton";
import ProductCard from "../components/ProductCard";

export default function Home() {

    const[products] = useProducts(false);

    return (
        <>
            <ProductContainer >
                {products.map(p => <div key={p.id} className={"product-card"}><ProductCard
                    children={

                        <>
                            {/*REMOVE BUTTON*/}
                            <div className={"crud-buttons-container"}>
                            <button type="button" className="btn  p-1 add-button" onClick={()=> {}}>Add</button>
                            <button type="button" className="btn  p-1 update-button" onClick={()=> {}}>Update</button>
                            <button type="button" className="btn  p-1 remove-button" onClick={()=> {}}>remove</button>
                            </div>
                        </>
                }
                                                                                            product={p}/></div>)}
            </ProductContainer>

            <LogoutButton/>
        </>
    )
}















// <div className={" carousel-container-wrapper"}>
//     <div className={"card  carousel-container "} style={{width: 1000}}>
//         <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
//             <div className="carousel-inner">
//                 <div className="carousel-item active">
//                     <img
//                         src="https://www.pixelstalk.net/wp-content/uploads/2016/09/Best-Beautiful-Images-For-Desktop-Nature.png"
//                         className="d-block w-100" alt="..."/>
//                 </div>
//                 <div className="carousel-item">
//                     <img
//                         src="https://www.pixelstalk.net/wp-content/uploads/2016/09/Best-Photos-For-Backgrounds-Free-Download.jpg"
//                         className="d-block w-100" alt="..."/>
//                 </div>
//                 <div className="carousel-item">
//                     <img
//                         src="/Users/kareem89/IdeaProjects/simple-onlineshope-my-capstone-project/frontend/src/images/test_photeo1.png"
//                         className="d-block w-100" alt="..."/>
//                 </div>
//             </div>
//             <button className="carousel-control-prev" type="button"
//                     data-bs-target="#carouselExampleAutoplaying"
//                     data-bs-slide="prev">
//                 <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Previous</span>
//             </button>
//             <button className="carousel-control-next" type="button"
//                     data-bs-target="#carouselExampleAutoplaying"
//                     data-bs-slide="next">
//                 <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                 <span className="visually-hidden">Next</span>
//             </button>
//         </div>
//     </div>
// </div>
