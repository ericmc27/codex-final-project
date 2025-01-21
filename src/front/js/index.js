//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";


//include your index.scss file into the bundle
import "../styles/index.css";


//import your own components
import Layout from "./layout";
import {io} from "socket.io-client"

export const socket = io("wss://fictional-broccoli-pjg645gp7jrgh7699-5000.app.github.dev/")

socket.on('connect', ()=>{
    socket.emit('addUser', localStorage.getItem("JWT"))
})

socket.on('lawyerAcceptedYourCase', ()=>{
    alert("your case was accepted")
})

socket.on('lawyerRejectedYourCase', ()=>{
    alert("your case was rejected")
})

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));