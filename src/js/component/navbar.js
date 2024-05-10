import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<div className="titulo">
			<Link to="/">
			<h1>Lista de Contactos</h1>
			</Link>
		</div>
	);
};
