import React from "react";
import AuthRouter from "./AuthRouter";
import AdminRouter from "./AdminRouter";
import MainLayout from "@/layouts/MainLayout";
import MainRouter from "./MainRouter";

const IndexRouter = () => {
	return (
		<div>
			<AuthRouter />
			<AdminRouter />
			<MainRouter />
		</div>
	);
};

export default IndexRouter;
