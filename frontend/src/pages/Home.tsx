import useProducts from "../hooks/useProducts";
import ProductContainer from "../components/ProductContainer";
import ProductCard from "../components/ProductCard";
import React, {useEffect, useState} from "react";
import axios from "axios";
import DeleteButton from "../components/DeleteButton";
import {deleteProduct, getProductByCategory, getProductById, getProducts} from "../api/ProductApi";
import AddButton from "../components/AddButton";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import {useParams} from "react-router-dom";
import useShoppingCart from "../hooks/useShoppingCart";
import UpdateForm from "../components/UpdateForm";
import useProduct from "../hooks/useProduct";
import {toast, ToastContainer} from "react-toastify";

export default function Home() {



    const {category} = useParams();
    const [,,sizeOfShoppingCart] = useShoppingCart('');
    const [files, setFiles] = useState<File[] | null>()
    const [searchParam,setSearchParam] = useState('')
    const [products, setProducts,isReady] = useProducts(searchParam);
    const [productId,setProductId] =useState("")
    const [product,setProduct] = useProduct(productId);
    const [previewUrls,setPreviewUrls] = useState<string[]>([])
    const [textPreview,setTextPreview] = useState<string>("")
    const [user] = useAuth()
    const role = user?.role;
    const notify = () => toast.success(' Product is successfully updated!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    console.log(product.name)
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
        setTextPreview('')

        const res = await axios.post("/api/products", formData);
        setProducts([...products, res.data])

        for (let previewUrl of previewUrls) {
            URL.revokeObjectURL(previewUrl)
        }
    }

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length) {
            const f = [];
            for (let file  of e.target.files) {
                f.push(file);
            }
            setFiles(f);

            for (let previewUrl of previewUrls) {
                URL.revokeObjectURL(previewUrl)
            }
            const fileUrls = [];

            for (let file of e.target.files) {
                if(file.type === "text/plain"){
                    const text =  await  file.text();
                    setTextPreview(text)
                }else {
                    fileUrls.push(URL.createObjectURL(file));
                }
            }
            setPreviewUrls(fileUrls);
        }
    }
    const onDelete = (id: string) => {
        const theNewProducts = products.filter(f => f.id !== id);
        setProducts([...theNewProducts])
        deleteProduct(id)
    }

    const onUpdate = async (e: React.FormEvent) => {
        e.preventDefault()

        const res = await axios.put("/api/products/update", product);
        setProducts(res.data)

        if (!files) {
            return;
        }
        const formData = new FormData();
        for (const file of files) {
            formData.append("file[]", file);
        }
        setFiles(null)
        setPreviewUrls([])

        const response = await axios.put("/api/products/add-photos/"+product.id, formData);
        setProducts(response.data)
        const productResponse = await getProductById(product.id)
        setProduct({...product,"imageIDs": productResponse.imageIDs})

        for (let previewUrl of previewUrls) {
            URL.revokeObjectURL(previewUrl)
        }

    }

    useEffect(() => {
        (async () => {
            if(category){
                const products = await getProductByCategory(category)
                setProducts(products)
            }else{
                const theProduct = await getProducts();
                setProducts(theProduct)
            }
        })();
    }, [category,setProducts]);

    return (
        <>
            <NavBar user={user} shoppingCartNum={sizeOfShoppingCart} onSearch={(e) => setSearchParam(e)} showSearchInput={true} />
            {isReady && products.length > 0 ?
            <ProductContainer>
                {products.map(p => <div key={p.id} className={"product-card"}><ProductCard product={p}/>
                    {/*CURD BUTTONS*/}
                    <div className={"crud-buttons-container"}>
                        {role === "ADMIN" &&
                            <UpdateForm
                                onSuccess={notify}
                                onSetId={() => setProductId(p.id)}
                                onUpdate={onUpdate}
                                onChange={onChange}
                                previewUrls={previewUrls}
                                productId={p.id}
                                setProduct={setProduct}
                                product={product}
                        />

                        }
                        {role === "ADMIN" && <DeleteButton onDelete={() => onDelete(p.id)}/>}
                    </div>
                </div>)}
            </ProductContainer>
                :
                <div className={"place-holder"}> Load data...</div>}
            {role === "ADMIN" &&  <AddButton onSubmit={onSubmit} onChange={onChange} previewUrls={previewUrls} textPreview={textPreview}/>}
            <ToastContainer/>

            <Footer/>

            </>
    )


}
