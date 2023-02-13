import React, {useState} from "react";
import useProduct from "../hooks/useProduct";
import {IMAGES_PATH} from "../model/aplication_properties";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useProducts from "../hooks/useProducts";
import axios from "axios";

export default function UpdateForm({onSetId}: {
    onSetId: (id: string) => string
}) {
    const [productId, setProductId] = useState("")
    const [product, setProduct] = useProduct(productId);
    const [products] = useProducts("");
    const [category, setCategory] = useState<string>(product.category)
    const [files, setFiles] = useState<File[] | null>()
    const [previewUrls, setPreviewUrls] = useState<string[]>([])

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
                            style={{width: "100%"}}>{product.imageIDs && product.imageIDs.map(img => <div key={img}><img
            style={{maxWidth: " 150px", display: "block"}}
            src={IMAGES_PATH + img}
            alt={img}></img>
            <button type={"button"} className={"btn d-block float-end p-0 me-4 remove-photo-button d-block"}
                    onClick={() => setProduct({...product, "imageIDs": product.imageIDs.filter(id => id !== img)})}>
                delete
            </button>
        </div>
    )}
    </div>;


    const onSubmit = async (e: React.FormEvent) => {
        // FILE UPLOAD
        e.preventDefault();
        if (!files) {
            return;
        }
        const formData = new FormData();
        for (const file of files) {
            formData.append("file[]", file);
        }
        setFiles(null)
        setPreviewUrls([])

        await axios.post("/api/products/test2", product);
        await axios.post("/api/products/test", formData);

        for (let previewUrl of previewUrls) {
            URL.revokeObjectURL(previewUrl)
        }

    }



    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const f = [];
            for (let file of e.target.files) {
                f.push(file);
            }
            setFiles(f);

            for (let previewUrl of previewUrls) {
                URL.revokeObjectURL(previewUrl)
            }
            const fileUrls = [];

            for (let file of e.target.files) {
                fileUrls.push(URL.createObjectURL(file));
            }
            setPreviewUrls(fileUrls);
        }
    }


    return (
        <>
            <>

                <Button onClick={() => {
                    handleShow()
                    setProductId(onSetId)
                }}>
                    UPDATE
                </Button>

                <Modal
                    backdrop="static"
                    show={show}
                    onHide={handleClose}
                    size="lg"
                    aria-labelledby="update-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Product</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={onSubmit}>
                        <Modal.Body>


                            <div className="input-group mb-4">
                                <span className="input-group-text  " style={{minWidth: "110px"}}>Name</span>
                                <input className="form-control block block"
                                       placeholder={"name of Product"}
                                       name={'name'}
                                       value={product.name}
                                       onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                                />
                            </div>

                            <div className="input-group mb-4 ">
                                <span className="input-group-text  " style={{minWidth: "110px"}}>Price</span>
                                <input className="form-control block block" style={{minWidth: "110px"}}
                                       type={"number"}
                                       value={product.price}
                                       placeholder={"Price"}
                                       name={'price'}
                                       onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}
                                />
                            </div>
                            <div className="input-group mb-4">
                                <span className="input-group-text  ">Description</span>
                                <textarea className="form-control" aria-label="With textarea" rows={3}
                                          value={product.description}
                                          placeholder={"Description"}
                                          name={'description'}
                                          onChange={(e) => setProduct({...product, [e.target.name]: e.target.value})}

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
                                       placeholder={"Category"}
                                       value={category}
                                       name={"category"}
                                />
                            </div>
                            {showPhotos}

                        </Modal.Body>
                        <Modal.Footer>
                            <h5 style={{display: "block"}}>New Photo</h5>
                            {previewUrls.map(img => <img key={img} style={{maxWidth: "150px"}} src={img} alt={img}/>)}

                            {/*THE TRIGGER BUTTON */}
                            <button className={"load-data-button"} onClick={() => {
                                fileInputRef.current?.click();
                            }}>load TXT File to update Details or Photos to update Alle Photos or Both
                            </button>

                            {/*THE ORIGINAL INPUT */}
                            <input type={"file"}
                                   ref={fileInputRef}
                                   style={{display: "none"}}
                                // ON CHANGE FOR INPUT
                                   onChange={onChange}
                                   multiple/>

                            {/*<Button variant="secondary"   onClick={handleClose}>*/}
                            {/*    cancel*/}
                            {/*</Button>*/}
                            <Button variant="primary" type={"submit"} onClick={handleClose}>
                                load data
                            </Button>

                        </Modal.Footer>
                    </form>

                </Modal>
            </>
            {/*---------------*/}

        </>
    )
}
