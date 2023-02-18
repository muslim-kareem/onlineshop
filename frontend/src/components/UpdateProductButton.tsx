import React from "react";

export default function UpdateProductButton({onSubmit,onChange,onSetId}:{
    onSetId: () => void
    onSubmit: (e: React.FormEvent) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}){
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    return(
        <>
            {/*UPDATE PRODUCT BUTTON*/}
            <div className={""}>
                <button type="button" className="btn  p-1 "  onClick={onSetId}
                        data-bs-toggle="modal" data-bs-target="#update-modal">
                     UPDATE
                </button>

                <div className="modal fade" id="update-modal" taria-labelledby="update" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id="update">UPDATE</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {/*THE FORM*/}
                                <form onSubmit={onSubmit }>

                                    {/*THE TRIGGER BUTTON */}
                                    <button className={"load-data-button"} onClick={() => {
                                        fileInputRef.current?.click();
                                    }}>load TXT File to update Details or Photos to update Alle Photos or Both</button>

                                    {/*THE ORIGINAL INPUT */}
                                    <input type={"file"}
                                           ref={fileInputRef}
                                           style={{display: "none"}}
                                        // ON CHANGE FOR INPUT
                                           onChange={onChange}
                                           multiple/>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal" >Abschicken</button>
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
