import useProducts from "../hooks/useProducts";
import ProductContainer from "../components/ProductContainer";
import LogoutButton from "../components/LogoutButton";
import ProductCard from "../components/ProductCard";
import useAuth from "../hooks/useAuth";
import React from "react";

export default function Home() {

    const[products] = useProducts(false);

    // const[user,setUser] = useAuth();

    return (
        <>
            <ProductContainer >
                {products.map(p => <div key={p.id} className={"product-card"}><ProductCard
                    children={

                        <>
                            {/*CURD BUTTONs*/}
                           <div className={"crud-buttons-container"}>
                                {/*<button type="button" className="btn  p-1 add-button" onClick={() => {*/}
                                {/*}}>Add*/}
                                {/*</button>*/}



                            <AddButton/>






                                <button type="button" className="btn  p-1 update-button" onClick={() => {
                                }}>Update
                                </button>
                                <button type="button" className="btn  p-1 remove-button" onClick={() => {
                                }}>remove
                                </button>
                            </div>

                        </>
                }
                                                                                            product={p}/></div>)}
            </ProductContainer>

            <LogoutButton/>
        </>
    )
}






function AddButton(){



    return(

        <>
            {/*ADD TO CARD BUTTON*/}
            <div className={"details-button-container"}>


                <button type="button" className="btn  p-1 add-button"  onClick={() => {
                }}
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                   add
                </button>



                <div className="modal fade" id="exampleModal" taria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                {/*<button type="submit" className="btn btn-primary">Save changes</button>*/}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/*---------------*/}
        </>
    )
}





