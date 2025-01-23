import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
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
					<Link
						to="/"
						className="text-decoration-none"
						style={{ color: "#EBE9E1" }}
					>
						Legal Sync
					</Link>
				</h1>
				<button
					onClick={handleLogout}
					className="btn btn-outline-light"
					style={{ color: "#EBE9E1" }}
				>
					Logout
				</button>
			</div>
		</nav>
	);
};
