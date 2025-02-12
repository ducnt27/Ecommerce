import AdminLayout from "@/layouts/AdminLayout";
import ColorIndex from "@/pages/admin/attributes/ColorIndex";
import SizeIndex from "@/pages/admin/attributes/SizeIndex";
import BrandIndex from "@/pages/admin/brand/BrandIndex";
import CategoryIndex from "@/pages/admin/category/CategoryIndex";
import ProductAdd from "@/pages/admin/products/ProductAdd";
import ProductIndex from "@/pages/admin/products/ProductIndex";
import ProductUpdate from "@/pages/admin/products/ProductUpdate";
import { Route, Routes } from "react-router-dom";

const AdminRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<AdminLayout />}>
				<Route path="products" element={<ProductIndex />} />
				<Route path="products/add" element={<ProductAdd />} />
				<Route path="products/update/:id" element={<ProductUpdate />} />
				<Route path="category" element={<CategoryIndex />} />
				<Route path="brand" element={<BrandIndex />} />
				<Route path="attributes/color" element={<ColorIndex />} />
				<Route path="attributes/size" element={<SizeIndex />} />
			</Route>
		</Routes>
	);
};

export default AdminRouter;
