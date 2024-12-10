import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRouter from "./AuthRouter";
import MainRouter from "./MainRouter";
import AdminRouter from "./AdminRouter";

const IndexRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainRouter />} />
			<Route path="/auth/*" element={<AuthRouter />} />
			<Route path="/admin/*" element={<AdminRouter />} />
		</Routes>
	);
};

export default IndexRouter;
