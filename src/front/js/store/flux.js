import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		},
		actions: {
			signupClient: async (e, {name, email, password, phone, address})=>{
				e.preventDefault();

				let newContact = {
					name,
					email,
					password,
					phone,
					address
				}

				let options = {
					method: 'POST',
					body: JSON.stringify(newContact), 
					headers: {
						'Content-Type': 'application/json'
					}
				}

				fetch('https://automatic-acorn-5g49j74xvvvv27945-3001.app.github.dev/api/clients', options)
				.then(response => {
					if (!response.ok) {
						throw Error("Error. Unable to post new contact.");
					}
					return response.json();
				})
				.then(data => {
					if (data) {
						alert("Oops! An account already exists with that email. ")
					}
					console.log(data)
				})
				.catch(error => {console.log("More info on error: ", error)})

			},
			signupLawyer: ()=>{

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
				fetch("https://automatic-acorn-5g49j74xvvvv27945-3001.app.github.dev/api/login", options)
				.then(response=>(response.json()))
				.then(data=>console.log(data))
			}
		}
	};
};

export default getState;
