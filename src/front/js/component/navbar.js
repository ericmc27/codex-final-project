import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light" style={{backgroundColor: '#3E362E'}}>
			<div className="container">
				<span className="h3 mb-0"><Link style={{color: "#EBE9E1"}} className="text-decoration-none" to={"/"}>Legal Sync</Link></span>
			</div>
		</nav>
	);
};
