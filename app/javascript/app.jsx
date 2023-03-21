import React from "react";
import {BrowserRouter, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
import Home from "./pages/home";
const App = (props) => {

    return (
        <>

            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>

            <Outlet/>
        </>

    );
}

export default App;