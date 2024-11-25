import Header from "@/components/client/header/Header";
import React from "react";

import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="font-fontG">
			<Header />
			<div className="pt-24">
				<Outlet />
			</div>
		</div>
	);
};

export default MainLayout;
