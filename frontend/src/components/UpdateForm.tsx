import React, {ChangeEvent, useState} from "react";
import {IMAGES_PATH} from "../model/aplication_properties";
import Modal from 'react-bootstrap/Modal';
import useProducts from "../hooks/useProducts";
import {Product} from "../model/Product";
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "react-bootstrap";

export default function UpdateForm({onUpdate, onChange, previewUrls, product, onSetId, setProduct,onSuccess}: {
    onSuccess: () => void,
    product: Product,
    setProduct: (product: Product) => void,
    onSetId: () => void,
    productId: string,
    previewUrls: string[],
    onUpdate: (e: React.FormEvent) => void,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
    const [products] = useProducts("");
    const [category, setCategory] = useState<string>(product.category)


    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
        setProduct({
            ...product,
            [event.target.name]: event.target.value
        });
    };


    // STYLE UPLOAD BUTTON
    const fileInputRef = React.useRef<HTMLInputElement>(null)

    // REACT BOOTSTRAP STATE
    const [show, setShow] = useState(false);
    const handleClose = () => { setShow(false);
    }
    const handleShow = () => setShow(true);
    //----------


    //MY ACTION METHODS
    const uniqueCategory = [...new Set(products.map(m => m.category))]
    const categoryDropdown = uniqueCategory.map(c => <li key={c}>
        <div
            className="dropdown-item"
            onClick={() => {
                setCategory(c)
                setProduct({...product, "category": c})
            }}>
            {c}
        </div>
    </li>);

    const showPhotos = <div className={"d-flex justify-content-around "}
                            style={{maxWidth: "100%"}}>{product.imageIDs && product.imageIDs.map(img => <div key={img}><img
            style={{width: " 150px", display: "block"}}
            src={IMAGES_PATH + img}
            alt={img}></img>
            <button type={"button"} className={"btn d-block float-end p-0 me-4 remove-photo-button d-block"}
                    onClick={() => setProduct({...product, "imageIDs": product.imageIDs.filter(id => id !== img)})}>
                delete
            </button>
        </div>
    )}
    </div>;

    return (
        <>
            <>
                <button className={"btn"} onClick={() => {
                    handleShow()
                    onSetId()
                }}>
                    UPDATE
                </button>

                <Modal
                    backdrop="static"
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="update-modal-sizes-title-lg">

                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>

                    {product.name && <form onSubmit={onUpdate}>
                        <Modal.Body>
                            <div className="input-group mb-4">
                                <span className="input-group-text  " style={{minWidth: "110px"}}>Name</span>
                                <input className="form-control block block"
                                       placeholder={"name of Product"}
                                       name={'name'}
                                       value={product.name}
                                       onChange={handleChange}
                                />
                            </div>

                            <div className="input-group mb-4 ">
                                <span className="input-group-text  " style={{minWidth: "110px"}}>Price</span>
                                <input className="form-control block block" style={{minWidth: "110px"}}
                                       type={"number"}
                                       value={product.price}
                                       placeholder={"Price"}
                                       name={'price'}
                                       onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-4">
                                <span className="input-group-text  ">Description</span>
                                <textarea className="form-control" aria-label="With textarea" rows={3}
                                          value={product.description}
                                          placeholder={"Description"}
                                          name={'description'}
                                          onChange={handleChange}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button"
                                        data-bs-toggle="dropdown" aria-expanded="false">CATEGORY
                                </button>
                                <ul className="dropdown-menu">
                                    {categoryDropdown}
                                </ul>
                                <input type="text" className="form-control" aria-label="Text input with dropdown button"
                                       readOnly
                                       placeholder={"Category"}
                                       value={category ? category : product.category}
                                       name={"category"}

                                />
                            </div>
                            {showPhotos}

                        </Modal.Body>
                        <Modal.Footer>
                            {/*<h5 style={{display: "block"}}>New Photo</h5>*/}
                            {previewUrls.map(img => <img key={img} style={{maxWidth: "150px"}} src={img} alt={img}/>)}

                            {/*THE TRIGGER BUTTON */}
                            <button className={"load-data-button"} onClick={() => {
                                fileInputRef.current?.click();
                            }}>Load new photos
                            </button>

                            {/*THE ORIGINAL INPUT */}
                            <input type={"file"}
                                   ref={fileInputRef}
                                   accept={"image/jpg"}
                                   style={{display: "none"}}
                                // ON CHANGE FOR INPUT
                                   onChange={onChange}
                                   multiple/>

                            <Button variant="secondary" className={"ms-3"}  onClick={handleClose}>
                                cancel
                            </Button>
                            <button className={"btn btn-outline-secondary bg-opacity-10"} type={"submit"} onClick={() => {
                                handleClose()
                                onSuccess()
                            }
                            }>
                                Save this State
                            </button>
                        </Modal.Footer>
                    </form>}
                </Modal>
            </>
            {/*---------------*/}
        </>
    )
}
