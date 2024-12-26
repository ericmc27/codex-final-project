import { element } from "prop-types";

const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
		},
		actions: {
			signup: async (e, {name, email, password, phone, address})=>{
				e.preventDefault();
			}
		}
	};
};

export default getState;
