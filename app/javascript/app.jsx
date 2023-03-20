import React from "react";
import {BrowserRouter, Outlet, Route, Routes, useNavigate} from "react-router-dom";
import Landing from "./pages/landing";
import Login from "./pages/login";
import Register from "./pages/register";
const App = (props) => {

    return (
        <>

            <Routes>
                <Route path="/" element={<Landing/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </>



    );
}

export default App;