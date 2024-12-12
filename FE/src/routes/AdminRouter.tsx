import AdminLayout from "@/layouts/AdminLayout";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import ProductAdd from "@/pages/admin/products/ProductAdd";
import ProductIndex from "@/pages/admin/products/ProductIndex";
import ProductUpdate from "@/pages/admin/products/ProductUpdate";
import { Route, Routes } from "react-router-dom";

const AdminRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminLayout />}>
				<Route path="product" element={<ProductIndex />} />
				<Route path="product/add" element={<ProductAdd />} />
				<Route path="product/update/:id" element={<ProductUpdate />} />
				<Route path="product/category" element={<CategoryIndex />} />
			</Route>
		</Routes>
	);
};

export default AdminRouter;
