import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			lawyersType: [
				"Corporate and Business",
				"Criminal",
				"Family",
				"Immigration",
				"Intellectual Property",
				"Personal Injury",
				"Real Estate",
				"Employment and Labor",
				"Environmental",
				"Tax",
				"Health",
				"Bankruptcy",
				"Civil Rights",
				"Estate Planning and Probate",
				"Technology and Cybersecurity",
				"Entertainment and Sports",
				"Education",
				"Maritime",
				"International",
				"Elder"
			]
		},
		actions: {
			signup: async (e, { name, email, password, phone, address, areaOfNeed, specialty }, userType) => {
				e.preventDefault();
				let newContact;

				if (userType === "Client") {
					newContact = {
						name: name.toLowerCase(),
						email: email.toLowerCase(),
						password,
						phone,
						address,
						areaOfNeed,
					}
				} else {
					newContact = {
						name: name.toLowerCase(),
						email: email.toLowerCase(),
						password,
						phone,
						address,
						photo: null,
						specialty,
					}
				}

				let options = {
					method: 'POST',
					body: JSON.stringify(newContact),
					headers: {
						'Content-Type': 'application/json'
					}
				}

				fetch(`https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/api/${userType.toLowerCase()}s`, options)
					.then(response => {
						if (!response.ok) {
							throw Error("Error. Unable to post new contact.");
						}
						return response.json();
					})
					.then(data => {
						if (data.message === "Account exists") {
							alert("Oops! An account already exists with that email. ")
						} else {
							alert("User added")
						}

					})
					.catch(error => { console.log("More info on error: ", error) })

			},
			login: (e, { email, password }, userType) => {
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
					.then(async response => {

						if (response.status === 200) {
							const data = await response.json();
							localStorage.setItem("JWT", data.token)

							if (data.userType === "Client") {
								localStorage.setItem("Area of Need", data.need)
								await getActions().displayLawyers(data.need)
								window.location.href = "/client"
							} else {
								localStorage.setItem("Specialty", data.specialty)
								window.location.href = "/lawyer"
							}
						}
						else if (response.status === 401) {
							const data = await response.json()
							alert(data.message)
						}

					})
			},
			getToken: () => {
				return localStorage.getItem("JWT")
			},
			storeProfilePicture: async (form) => {
				const token = await getActions().getToken()

				fetch("https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/picture", {
					method: 'POST',
					body: form,
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
			},
			displayLawyers: async (lawyerType) => {
				const body = { lawyerType }
				const options = {
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json'
					}
				}
				const result = await fetch("https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/api/display", options)
				const data = await result.json()
				localStorage.setItem("lawyers", JSON.stringify(data))
			},
			verifyJwt: async () => {
				let token = getActions().getToken()

				const options = {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`
					}
				}

				const result = await fetch("https://opulent-lamp-jj4gvp4qrrxq3qwr6-3001.app.github.dev/api/verify", options)
				if ([422, 401].includes(result.status)) {
					window.location.href = "/login"
					return
				}

				token = await result.json()
				return token
			}
		}
	};
};

export default getState;
