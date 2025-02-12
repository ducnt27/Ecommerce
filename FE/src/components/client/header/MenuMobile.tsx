import React from "react";
import { NavLink } from "react-router-dom";

const MenuMobile = () => {
	const menuItems = [
		{ label: "Trang chủ", path: "/" },
		{ label: "Sản phẩm", path: "/shop" },
		{ label: "Bài viết", path: "/blog" },
		{ label: "Liên hệ", path: "/contact" },
	];
	return (
		<div>
			<nav className="flex flex-col space-y-6 p-6">
				{menuItems?.map((item) => (
					<NavLink
						key={item.path}
						to={item.path}
						className="text-lg font-medium"
					>
						{item.label}{" "}
					</NavLink>
				))}
			</nav>
		</div>
	);
};

export default MenuMobile;
