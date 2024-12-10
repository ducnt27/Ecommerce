import AdminLayout from "@/layouts/AdminLayout";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import { Route, Routes } from "react-router-dom";

const AdminRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminLayout />}>
				<Route path="product/category" element={<CategoryIndex />} />
			</Route>
		</Routes>
	);
};

export default AdminRouter;
