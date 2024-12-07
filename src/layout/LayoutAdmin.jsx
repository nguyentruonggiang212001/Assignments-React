import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const LayoutAdmin = () => {
	const role = localStorage.getItem("role");
	console.log(role);
	// return <>{role === "admin" ? children : <Navigate to="/login" />}</>;
	return <>{role === "admin" ? <Outlet/> : "Bạn không có quyền vào trang này"}</>;
};

export default LayoutAdmin;