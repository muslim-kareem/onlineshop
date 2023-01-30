import NavBar from "./components/NavBar";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import AuthUser from "./components/AuthUser";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./components/LogoutButton";
import ProductDetails from "./components/ProductDetails";
import React from "react";
import useAuth from "./hooks/useAuth";
import axios from "axios";
import ShoppingCard from "./components/ShoppingCard"
import useProducts from "./hooks/useProducts";
import {removeFromShoppingCart} from "./api/ProductApi";

export default function Root(){


    const[user,setUser] = useAuth()
    const [shoppingCart,setShoppingCards] = useProducts(true);


    const login = async (credentials: {username: string,password: string})=> {
        const res = await axios.post("/api/app-users/login", null, {
            headers: {
                "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
            }

        });
        setUser(res.data)
    }

    const onRemove = (id: string) => {
        const theNewShoppingCard = shoppingCart.filter(f => f.id !== id)
        removeFromShoppingCart(id);
        setShoppingCards([...theNewShoppingCard])
    }

    return(
        <>
            <NavBar user={user}/>
            <Routes>
                <Route path={"/home-shopping-cart"} element={<ShoppingCard cartProducts={shoppingCart} onRemove={onRemove}/>} />
                <Route path={"/"} element={<Home/>} />
                <Route path={"/login"} element={
                    <AuthUser>
                        <LoginPage login={login}/>
                    </AuthUser>}
                />
                <Route path={"/"} element={<LogoutButton/>} />
                <Route path={"/details/:id"} element={<ProductDetails/>} />
            </Routes>

        </>
    )
}