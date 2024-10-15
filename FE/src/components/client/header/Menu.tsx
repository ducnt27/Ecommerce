import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
	const menuItems = [
		{ label: "Trang chủ", path: "/" },
		{ label: "Tops", path: "/tops" },
		{ label: "Bottoms", path: "/bottoms" },
		{ label: "Kids", path: "/kids" },
		{ label: "Accessories", path: "/accessories" },
		{ label: "Collections", path: "/collections" },
		{ label: "Sale", path: "/sale" },
	];
	return (
		<div className="">
			<ul className="text-black font-medium flex items-center justify-center gap-x-5 *:py-0.5 *:border-b-[3px] *:border-transparent transition-all">
				{menuItems?.map((item) => (
					<li className=" hover:border-blue-500 hover:text-blue-500 has-[.active]:border-blue-500 has-[.active]:text-blue-500 cursor-pointer">
						<NavLink
							key={item.path}
							to={item.path}
							// onClick={toggleMenu}
						>
							{item.label}
						</NavLink>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Menu;
