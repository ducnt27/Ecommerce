import React, { useState } from "react";
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Drawer, Menu } from "antd";
import { Link, Navigate, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];
const navigate = useNavigate();
const items: MenuItem[] = [
	{ key: "/", icon: <PieChartOutlined />, label: "Option 1" },
	{ key: "2", icon: <DesktopOutlined />, label: "Option 2" },
	{
		key: "sub1",
		label: "Sản phẩm",
		icon: <MailOutlined />,
		children: [
			{ key: "/admin/product/category", label: "Danh mục" },
			{ key: "/admin/product", label: "Sản phẩm" },
			{ key: "/admin/product/add", label: "Thêm sản phẩm" },
		],
	},
];

type Props = {
	open: null;
	close: any;
	handleClickMenu: () => void;
};

const MenuAdmin = ({ open, close, handleClickMenu }: Props) => {
	return (
		<div className="">
			<Drawer
				title="Menu"
				placement="left"
				closable={false}
				onClose={() => handleClickMenu}
				bodyStyle={{ padding: 0 }}
			>
				<Menu
					defaultSelectedKeys={["1"]}
					// defaultOpenKeys={["sub1"]}
					onClick={handleClickMenu}
					mode="inline"
					items={items}
					className="h-full"
				/>
				{/* <MenuAdmin 
				{/* <MenuAdmin close={setCollapsed} /> */}
			</Drawer>
		</div>
	);
};

export default MenuAdmin;
