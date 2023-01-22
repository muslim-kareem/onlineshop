import React from 'react';

import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LogoutButton from "./components/LogoutButton";
import NavBar from "./components/NavBar";
import Home from "./model/Home";

function App() {


    return (

        <>
            <NavBar/>
            <Home/>
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
