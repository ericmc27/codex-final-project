import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";


import injectContext from "./store/appContext";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Home from "./pages/Home.jsx";
import Lawyer, { ProtectedLawyer, Profile } from "./pages/Lawyer.jsx";
import Client, { ProtectedClient } from "./pages/Client.jsx"
import CurrentClient from "./pages/CurrentClient.jsx";
import { Navbar } from "./component/navbar";


//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home/>} path="/" />
                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<CurrentClient />} path="/current_client" />
                        <Route element={<ProtectedLawyer><Lawyer /></ProtectedLawyer>} path="/lawyer" />
                        <Route element={<ProtectedLawyer><Profile /></ProtectedLawyer>} path="/profile" />
                        <Route element={<ProtectedClient><Client /></ProtectedClient>} path="/client" />
                        <Route element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
