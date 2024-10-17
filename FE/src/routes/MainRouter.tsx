import MainLayout from "@/layouts/MainLayout";
import HomePage from "@/pages/clients/HomePage";
import React from "react";
import { Routes, Route } from "react-router-dom";

const MainRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
			</Route>
		</Routes>
	);
};

export default MainRouter;
