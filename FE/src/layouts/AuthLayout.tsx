import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="relative font-fontG bg-blue-500 w-full h-[300px]">
			<div className="bg-gradient-to-t from-blue-300 to-purple-400">
				<Outlet />
			</div>
		</div>
	);
};

export default AuthLayout;
