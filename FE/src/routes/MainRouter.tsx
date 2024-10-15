import MainLayout from "@/layouts/MainLayout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const MainRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<MainLayout />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default MainRouter;
