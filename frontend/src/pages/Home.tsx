import useProducts from "../hooks/useProducts";
import ProductContainer from "../components/ProductContainer";
import LogoutButton from "../components/LogoutButton";
import ProductCard from "../components/ProductCard";
import React, {useState} from "react";
import axios from "axios";

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
                               <AddButton/>
                                <button type="button" className="btn  p-1 update-button" onClick={() => {
                                }}>Update
                                </button>
                                <button type="button" className="btn  p-1 remove-button" onClick={() => {
                                }}>remove
                                </button>
                            </div>

                        </> }
                                                                                            product={p}/>
                </div>)}
            </ProductContainer>


            <LogoutButton/>
        </>
    )
}



function AddButton(){
    const[file,setFile] =useState<File | null>()
    const fileInputRef = React.useRef<HTMLInputElement>(null)

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
                                {/*THE FORM*/}
                                <form
                                    // ON SUBMIT FOR THE FORM
                                    onSubmit={async (e) => {
                                        // FILE UPLOAD
                                        e.preventDefault();
                                        if (file) {
                                            const formData = new FormData();
                                            formData.append(`file`, file);

                                            const res = await axios.post("/api/files", formData);
                                            alert(JSON.stringify(res.data, null, 2));
                                        }
                                    }
                                    }>

                                    {/*THE TRIGGER BUTTON */}
                                    <button onClick={() => {
                                        fileInputRef.current?.click();
                                        setFile(null);
                                    }}>load data</button>

                                    {/*THE ORIGINAL INPUT */}
                                    <input type={"file"}
                                           ref={fileInputRef}
                                            style={{display: "none"}}
                                        // ON CHANGE FOR INPUT
                                           onChange={(e) => {
                                               if (e.target.files && e.target.files.length) {
                                                   setFile(e.target.files[0])
                                               }
                                           }}
                                           multiple/>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Abschicken</button>
                                        {/*<button type="submit" className="btn btn-primary">Save changes</button>*/}
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                {/*---------------*/}
        </>
    )
}





