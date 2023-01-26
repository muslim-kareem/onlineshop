import React from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./components/LogoutButton";
import NavBar from "./components/NavBar";
import AuthUser from "./components/AuthUser";
import ProductDetails from "./components/ProductDetails";
import Home from "./pages/Home";
import useAuth from "./hooks/useAuth";
import axios from "axios";


function App() {
    const[user,setUser] = useAuth()


    const login = async (credentials: {username: string,password: string})=> {
        const res = await axios.post("/api/app-users/login", null, {
        headers: {
            "Authorization": "Basic " + window.btoa(`${credentials.username}:${credentials.password}`)
        }

    });
        setUser(res.data)
    }


    return (

        <>



            <BrowserRouter>
                <NavBar user={user}/>
                <Routes>
                    <Route path={"/"} element={<Home/>} />
                    <Route path={"/login"} element={
                        <AuthUser>
                        <LoginPage login={login}/>
                        </AuthUser>}
                    />
                    <Route path={"/"} element={<LogoutButton/>} />
                    <Route path={"/details/:id"} element={<ProductDetails/>} />
                </Routes>


            </BrowserRouter>

        </>

    );
}

export default App;
