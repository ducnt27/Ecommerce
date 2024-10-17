import AuthLayout from "@/layouts/AuthLayout";
import SignInPage from "@/pages/auth/Signin";
import SignupPage from "@/pages/auth/Signup";
import React from "react";
import { Routes, Route } from "react-router-dom";

const AuthRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<AuthLayout />}>
				<Route path="register" element={<SignupPage />} />
				<Route path="login" element={<SignInPage />} />
			</Route>
		</Routes>
	);
};

export default AuthRouter;
