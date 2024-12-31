import { element } from "prop-types";
import { use } from "react";
import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		},
		actions: {
			signup: async (e, {name, email, password, phone, address, specialty}, userType)=>{
				e.preventDefault();
				let newContact

				if(userType === "client"){
					newContact = {
						name: name.toLowerCase(),
						email: email.toLowerCase(),
						password,
						phone,
						address: address.toLowerCase(),
						user_type: userType
					}
				}else{
					newContact = {
						name: name.toLowerCase(),
						email: email.toLowerCase(),
						password,
						phone,
						address: address.toLowerCase(),
						photo: null,
						specialty: specialty.toLowerCase(),
						user_type: userType
					}
				}
			
				let options = {
					method: 'POST',
					body: JSON.stringify(newContact), 
					headers: {
						'Content-Type': 'application/json'
					}
				}

				fetch(`https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/api/${userType}s`, options)
				.then(response => {
					if (!response.ok) {
						throw Error("Error. Unable to post new contact.");
					}
					return response.json();
				})
				.then(data => {
					if (data.message === "Account exists") {
						alert("Oops! An account already exists with that email. ")
					}else{
						alert("User added")
					}

				})
				.catch(error => {console.log("More info on error: ", error)})

			},
			login: (e, {email, password}, userType)=>{
				e.preventDefault()

				const userData = {
					email,
					password,
					user_type: userType
				}

				const options = {
					method: 'POST',
					body: JSON.stringify(userData),
					headers: {
						'Content-Type': 'application/json'
					}
				}
				fetch("https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/api/login", options)
				.then(async response=>{
					const token = await response.json();

					if (response.status === 200) {
						localStorage.setItem("JWT", token)
						window.location.href = "/client"
					}
					else if (response.status === 401){
						alert(data.message)
					}
					
				})
			},

			verifyJwt: async ()=>{
				const token = localStorage.getItem("JWT")

				const options = {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`
					}
				}

				const result = await fetch("https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/api/verify", options)
				if([422, 401].includes(result.status)){
					window.location.href = "/login"
					return
				}
			
				const data = await result.json()
				return data
			}
		}
	};
};

export default getState;
