import AdminLayout from "@/layouts/AdminLayout";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const AdminRouter = () => {
	return (
		<div>
			<BrowserRouter>
				<Routes>
					<Route path="/admin" element={<AdminLayout />}>
						<Route />
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
};

export default AdminRouter;
