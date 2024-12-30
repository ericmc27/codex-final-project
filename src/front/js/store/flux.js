import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		},
		actions: {
			signupClient: async (e, {name, email, password, phone, address}, {areaOfNeed})=>{
				e.preventDefault();

				let newContact = {
					name,
					email,
					password,
					phone,
					address,
					areaOfNeed
				}

				let options = {
					method: 'POST',
					body: JSON.stringify(newContact), 
					headers: {
						'Content-Type': 'application/json'
					}
				}

				fetch('https://verbose-eureka-7v7qjg57x95g2wwq4-3001.app.github.dev/api/clients', options)
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

			signupLawyer: async (e, {name, email, password, phone, address}, {photo, specialty, barNumber, lawFirm, professionalExperience, credentials} )=>{
					e.preventDefault();
	
					let newContact = {
						name,
						email,
						password,
						phone,
						address,
						photo,
						specialty, 
						barNumber,
						lawFirm, 
						professionalExperience,
						credentials
					}
	
					let options = {
						method: 'POST',
						body: JSON.stringify(newContact), 
						headers: {
							'Content-Type': 'application/json'
						}
					}
	
					fetch('https://verbose-eureka-7v7qjg57x95g2wwq4-3001.app.github.dev/api/lawyers', options)
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

			
		}
	};
};

export default getState;
