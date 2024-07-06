import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import LoginPage from "../pages/Login";

const ProtectedRoute = () => {
	const { isAuthen } = useAuth();
	return isAuthen === true ? <Outlet /> : <LoginPage/>
}

export default ProtectedRoute;
