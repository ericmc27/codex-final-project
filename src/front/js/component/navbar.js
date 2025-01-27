import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../img/Logo.png';

export const Navbar = () => {
	const notDisplay = ['/', '/login']

	const currentPage = window.location.pathname
	const navigate = useNavigate();

	const handleLogout = () => {
		// Remove all storage items
		localStorage.clear();
		// Redirect to the login page
		navigate("/login");
	};

	return (
		<nav
			className="navbar navbar-light"
			style={{ backgroundColor: "#3E362E" }}
			role="navigation"
			aria-label="Main Navigation"
		>
			<div className="container d-flex justify-content-between align-items-center">
				
				<h1 className="h3 mb-0">
					<img src={logo} alt="Logo" height={'50px'}/>
					<Link
						to="/"
						className="text-decoration-none"
						style={{ color: "#EBE9E1", paddingLeft: "10px" }}
					>
						Legal Sync
					</Link>
				</h1>
				{
					!notDisplay.includes(currentPage) &&
					<button
					onClick={handleLogout}
					className="btn btn-outline-light"
					style={{ color: "#EBE9E1" }}
				>
					Logout
				</button>
				}
				
			</div>
		</nav>
	);
};
