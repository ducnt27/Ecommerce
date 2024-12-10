import React, { useEffect, useState } from "react";
import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "usehooks-ts";
import { useOpenSidebar } from "@/store/useSidebarAdmin";
const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

// Menu items
const items: MenuItem[] = [
	{ key: "/", icon: <PieChartOutlined />, label: "Trang chủ" },
	{ key: "/dashboard", icon: <DesktopOutlined />, label: "Dashboard" },
	{ key: "/settings", icon: <ContainerOutlined />, label: "Cài đặt" },
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
	{
		key: "sub2",
		label: "Navigation Two",
		icon: <AppstoreOutlined />,
		children: [
			{ key: "/option9", label: "Option 9" },
			{ key: "/option10", label: "Option 10" },
		],
	},
];

const AdminLayout: React.FC = () => {
	const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar trạng thái mở/đóng
	const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Drawer trạng thái hiển thị
	const navigate = useNavigate();
	const matches = useMediaQuery("(min-width:1024px)");
	// Xử lý khi click vào Menu.Item
	const { isOpen, setClose } = useOpenSidebar();
	const handleMenuClick: MenuProps["onClick"] = ({ key }) => {
		setIsDrawerVisible(false); // Đóng Sidebar khi click vào item
		navigate(key); // Điều hướng
	};

	// useEffect(() => {
	// 	if (matches) {
	// 		setClose();
	// 	}
	// });
	console.log("open", isOpen);
	return (
		<div className="flex  min-h-[100vh]">
			<div
				className={cn(
					window.innerWidth < 1024 ? "hidden" : "block",
					"w-[280px]",
				)}
			>
				<div className="h-16">Nguyễn Tuấn Đức</div>
				<Menu
					mode="inline"
					items={items}
					onClick={handleMenuClick}
					theme="dark"
					style={{ height: "calc(100vh - 64px)" }}
				/>
			</div>

			{/* Main Layout */}
			<Layout>
				{/* Header */}
				<Header className="bg-white flex justify-between items-center px-4 lg:px-8">
					{/* Nút menu trên header */}
					<Button
						type="text"
						icon={isCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={() =>
							window.innerWidth < 1024
								? setIsDrawerVisible(true)
								: setIsCollapsed(!isCollapsed)
						}
						style={{ fontSize: "20px" }}
						className={cn(window.innerWidth > 1024 ? "hidden" : "block")}
					/>
					<div>Header</div>
				</Header>

				{/* Drawer (chỉ hiển thị trên màn hình nhỏ) */}
				<Drawer
					placement="left"
					closable
					onClose={() => setIsDrawerVisible(false)}
					open={isDrawerVisible}
					width={280}
					bodyStyle={{ padding: 0 }}
				>
					<Menu
						mode="inline"
						items={items}
						onClick={handleMenuClick}
						theme="dark"
					/>
				</Drawer>

				{/* Content */}
				<Content className="bg-white m-4 lg:m-6 p-4 ">
					<Outlet />
				</Content>
			</Layout>
		</div>
	);
};

export default AdminLayout;
