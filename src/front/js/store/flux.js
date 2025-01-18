import {Client} from "@twilio/conversations";


// export let client = new Client(`${localStorage.getItem("CHAT")}`);
// console.log(client)
// const conversation = client.createConversation()

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
				"Elder",
			],
		},
		actions: {
			signup: async (e, { name, email, password, phone, address, areaOfNeed, specialty }, userType, navigate) => {
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

				fetch(`${process.env.BACKEND_URL}/api/${userType.toLowerCase()}s`, options)
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
							alert("User added successfully!");
							console.log("Redirecting to login...");
							navigate('/login');
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
				fetch(`${process.env.BACKEND_URL}/api/login`, options)
					.then(async response => {

						if (response.status === 200) {
							const data = await response.json();
							localStorage.setItem("JWT", data.token)
							localStorage.setItem("CHAT", data.chatToken)

							if (data.userType === "Client") {
								localStorage.setItem("Area of Need", data.need)
								await getActions().displayLawyers(data.need)
								window.location.href = "/client"
							} else {
								localStorage.setItem("Specialty", data.specialty)
								localStorage.setItem("Profile Picture", data.photo)
								localStorage.setItem("Name", data.name)
								window.location.href = "/lawyer"
							}
						}
						else if (response.status === 401) {
							const data = await response.json()
							alert(data.message)
						}

					})
			},
			forgotPassword: ()=>{
				// await fetch(`${process.env.BACKEND_URL}/forgot-password`)
			},
			submitCase: async(message, lawyer)=>{
				const body = {
					...message,
					lawyerId: lawyer.id
				}

				const response = await fetch(`${process.env.BACKEND_URL}/api/submit-case`,{
					method: 'POST',
					body: JSON.stringify(body),
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${localStorage.getItem("JWT")}`
					}
				})
				
				const data = await response.json()
				console.log(data)
			},
			getIncomingCases: async()=>{
				const body = {photo: localStorage.getItem("Profile Picture")}
				
				const result = await fetch(`${process.env.BACKEND_URL}/api/incoming-cases`,{
						headers: {
							'Authorization': `Bearer ${localStorage.getItem("JWT")}`
						}
					}
				)
				const data = await result.json()
				return data
			},
			getToken: () => {
				return localStorage.getItem("JWT")
			},
			storeProfilePicture: async (form) => {
				const token = await getActions().getToken()

				await fetch(`${process.env.BACKEND_URL}/picture`, {
					method: 'POST',
					body: form,
					headers: {
						'Authorization': `Bearer ${token}`
					}
				})
				.then(async response=>{
					const data = await response.json()
					localStorage.setItem("Profile Picture", data.photo)
					
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
				const result = await fetch(`${process.env.BACKEND_URL}/api/display`, options)
				const data = await result.json()
				localStorage.setItem("lawyers", JSON.stringify(data))
			},
			closedCases: async(lawyerId)=>{
				let photo = localStorage.getItem('lawyers')
				photo = JSON.parse(photo).find(obj=>obj.id===parseInt(lawyerId))?.photo
				const body = {photo: photo ? photo : getActions().getProfilePicture()}
				
				const response = await fetch(`${process.env.BACKEND_URL}/api/closed-cases`,
					{
						method: 'POST',
						body: JSON.stringify(body),
						headers: {
							'Content-Type': 'application/json',
							'Authorization': `Bearer ${localStorage.getItem("JWT")}`
						}
					}

				)
				const data = await response.json()
				return data
			},
			getProfilePicture: ()=>{
				return localStorage.getItem("Profile Picture")
			},
			verifyJwt: async () => {
				let token = getActions().getToken()

				const options = {
					method: "GET",
					headers: {
						"Authorization": `Bearer ${token}`
					}
				}

				const result = await fetch(`${process.env.BACKEND_URL}/api/verify`, options)
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
