import AdminLayout from "@/layouts/AdminLayout";
import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRouter from "./PrivateRouter";

const AdminRouter = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRouter>
						<AdminLayout />
					</PrivateRouter>
				}
			></Route>
		</Routes>
	);
};

export default AdminRouter;
