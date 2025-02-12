import MainLayout from "@/layouts/MainLayout";
import AccountIndex from "@/pages/clients/account/AccountIndex";
import CartIndex from "@/pages/clients/cart/CartIndex";
import HomePage from "@/pages/clients/HomePage";
import ProductDetail from "@/pages/clients/product-detail/ProductDetailPage";
import ShopIndex from "@/pages/clients/shop/ShopIndex";
import React from "react";
import { Routes, Route } from "react-router-dom";

const MainRouter = () => {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				{/* <Route index element={<HomePage />} /> */}
				<Route path="account" element={<AccountIndex />} />
				<Route path="shop" element={<ShopIndex />} />
				<Route path="cart" element={<CartIndex />} />
				<Route path="detail/:slug" element={<ProductDetail />} />
			</Route>
		</Routes>
	);
};

export default MainRouter;
