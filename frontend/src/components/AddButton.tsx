import React from "react";

export default function AddButton({onSubmit,onChange}:{
    onSubmit: (e: React.FormEvent) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}){
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    return(
        <>
            {/*ADD TO CARD BUTTON*/}
            <div className={"details-button-container"}>


                <button type="button" className="btn  p-1 add-button"  onClick={() => {
                }}
                        data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Add new product
                </button>

                <div className="modal fade" id="exampleModal" taria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="add-new-product">Add new P</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/*THE FORM*/}
                                <form onSubmit={onSubmit }>

                                    {/*THE TRIGGER BUTTON */}
                                    <button className={"load-data-button"} onClick={() => {
                                        fileInputRef.current?.click();
                                    }}>select TXT file and all PHOTOS</button>

                                    {/*THE ORIGINAL INPUT */}
                                    <input type={"file"}
                                           ref={fileInputRef}
                                           style={{display: "none"}}
                                        // ON CHANGE FOR INPUT
                                           onChange={onChange}
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