import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext.jsx";

export const Navbar = () => {
	const { darkMode, toggleTheme } = useTheme();

	return (
		<nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
			<div className="container">
				<Link to="/">
					<span className="navbar-brand">Legal Consultation</span>
				</Link>

				<div className="d-flex align-items-center">
					<button
						className={`btn ${darkMode ? 'btn-light' : 'btn-dark'} me-2`}
						onClick={toggleTheme}
					>
						{darkMode ? '☀️' : '🌙'}
					</button>

					<Link to="/login">
						<button className="btn btn-primary">Login</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};
