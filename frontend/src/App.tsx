import React from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./components/LogoutButton";
import NavBar from "./components/NavBar";
import AuthUser from "./components/AuthUser";
import ProductContainer from "./components/ProductContainer";
import useAllProducts from "./hooks/useAllProducts";


function App() {


    const[products,setPoducts] = useAllProducts([]);

    return (

        <>
            <AuthUser>
               <NavBar/>
            </AuthUser>
            <ProductContainer products={products}></ProductContainer>

            {/*<Home/>*/}
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/" element={<LogoutButton/>}/>
                </Routes>
            </BrowserRouter>


        </>

    );
}

export default App;
