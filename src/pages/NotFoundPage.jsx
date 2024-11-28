import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<div>
			<h1>404</h1>
			<h2>Not Found Page</h2>
			<Link to="/">Go back Home Page</Link>
		</div>
	);
};

export default NotFoundPage;