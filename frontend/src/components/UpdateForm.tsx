import React, {useState} from "react";
import useProduct from "../hooks/useProduct";
import {IMAGES_PATH} from "../model/aplication_properties";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useProducts from "../hooks/useProducts";

export default function UpdateForm({onSetId}:{
        onSetId: (id: string) => string
}){
    const [productId,setProductId] = useState("")
    const [product,setProduct] = useProduct(productId);
    const [products] = useProducts("");
    const [category,setCategory] = useState<string>(product.category)

    // STYLE UPLOAD BUTTON
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // REACT BOOTSTRAP STATE
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    //----------

    console.log(product.category)


    //MY ACTION METHODS
    const uniqueCategory = [...new Set(products.map(m => m.category))]
    const categoryDropdown = uniqueCategory.map(c => <li key={c}><div
                                                              className="dropdown-item"
                                                              onClick={() =>  {
                                                                  setCategory(c)
                                                              }} >
     {c}
    </div></li>);

    const showPhotos = <div>{product.imageIDs && product.imageIDs.map( img => <img key={img}
                                                                                   style={{width: "20%"}}
                                                                                   src={IMAGES_PATH + img}
                                                                                   alt={img}
    />)}</div>;

    const onSubmit = (e: React.FormEvent) => {
            e.preventDefault()
    }
    const onChange = () => {

    }


    return(
        <>
            <>
            <form onSubmit={onSubmit}>
                <Button variant="primary" onClick={()=> {
                    handleShow()
                    setProductId(onSetId)
                }}>
                    Launch demo modal
                </Button>

                <Modal
                    backdrop="static"
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="input-group mb-4">
                            <span className="input-group-text  " style={{minWidth: "110px"}} >Name</span>
                            <input className="form-control block block"
                                   placeholder={"name of Product"}
                                   name={'name'}
                                   value={product.name}
                                   onChange={(e) => setProduct({...product, [e.target.name]: e.target.value} )

                            }/>
                        </div>

                        <div className="input-group mb-4 ">
                            <span className="input-group-text  " style={{minWidth: "110px"}} >Price</span>
                            <input className="form-control block block" style={{minWidth: "110px"}}
                                   type={"number"}
                                   value={product.price}
                                   placeholder={"Name"}
                                   name={'price'}
                                   onChange={(e) => setProduct({...product, [e.target.name]: e.target.value} )}

                                  />
                        </div>
                        <div className="input-group mb-4">
                            <span className="input-group-text  ">Description</span>
                            <textarea className="form-control" aria-label="With textarea" rows={3}
                                      value={product.description}
                                      placeholder={"Description"}
                                      name={'description'}
                                      onChange={(e) => setProduct({...product, [e.target.name]: e.target.value} )}

                            />
                        </div>
                        <div className="input-group mb-3">
                            <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                    data-bs-toggle="dropdown" aria-expanded="false">CATEGORY
                            </button>
                            <ul className="dropdown-menu" >
                                {categoryDropdown}
                            </ul>
                            <input type="text" className="form-control" aria-label="Text input with dropdown button"
                                   placeholder={"Category"}
                                   value={product.category}
                                   name={"category"}
                                   onChange={(e) => setProduct({...product, [e.target.name]: category} )}

                                       />
                        </div>
                    {showPhotos}


                    </Modal.Body>
                    <Modal.Footer>
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

                        <Button variant="secondary"   onClick={handleClose}>
                            cancel
                        </Button>
                        <Button variant="primary" type={"submit"} onClick={handleClose}>
                            load data
                        </Button>

                    </Modal.Footer>

                </Modal>
            </form>
            </>
            {/*---------------*/}

        </>
    )
}
