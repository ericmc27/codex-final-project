import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            lawyers: {
              "Family":[
                {
                  id: 1,
                  name: "Eric",
                },
                {
                  id: 2,
                  name: "Diego",
                },
                {
                  id: 3,
                  name: "Jose",
                },
              ],
              "Immigration": [
                {
                  id: 1,
                  name: "Lebron",
                },
              ],
              "Food": [
                {
                  id: 1,
                  name: "Maria",
                }
              ]
            },
            
           lawyersType: [
              "Family",
              "Immigration",
              "Food"
            ]
            
		},
		actions: {
			signupClient: async (e, {name, email, password, phone, address})=>{
				e.preventDefault();
			}
		}
	};
};

export default getState;
