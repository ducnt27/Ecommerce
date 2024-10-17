import Header from "@/components/client/header/Header";
import React from "react";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="font-fontG">
			<Header />
			<div className="">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
