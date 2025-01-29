//import react into the bundle
import React from "react";
import ReactDOM from "react-dom";


//include your index.scss file into the bundle
import "../styles/index.css";


//import your own components
import Layout from "./layout";
import {io} from "socket.io-client"

export const socket = io("wss://potential-engine-4jgr5pgwqj6w376xw-5000.app.github.dev/")

socket.on('connect', ()=>{
    socket.emit('addUser', localStorage.getItem("JWT"))
})

socket.on('lawyerAcceptedYourCase', ()=>{
    alert("your case was accepted")
})

socket.on('lawyerRejectedYourCase', ()=>{
    alert("your case was rejected")
})

socket.on('lawyerCompletedYourCase', ()=>{
    alert("your case is completed")
})

setInterval(async ()=>{
    const refresh_jwt = localStorage.getItem('refresh_token')
    console.log("refresh tokennnnnnnnnnnnnn")
    const response = await fetch(`${process.env.BACKEND_URL}/api/refresh`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${refresh_jwt}`
        }
    })

    const data = await response.json()
    localStorage.setItem("JWT", data.token)
}, 840000)

//render your react application
ReactDOM.render(<Layout />, document.querySelector("#app"));