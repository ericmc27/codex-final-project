import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		},
		actions: {
			signup: async (e, {name, email, password, phone, address})=>{
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

				fetch('https://reimagined-halibut-4jq4pxvqr7963jj5r-3001.app.github.dev/api/clients', options)
				.then(response => {
					if (!response.ok) {
						throw Error("Error. Unable to post new contact.");
					}
					console.log("Contact successfully added!");
					return response.json();
				})
				.catch(error => {console.log("More info on error: ", error)})
			}
		}
	};
};

export default getState;
