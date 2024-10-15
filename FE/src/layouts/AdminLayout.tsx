import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import {
	MenuUnfoldOutlined,
	MenuFoldOutlined,
	HomeOutlined,
	UserOutlined,
	SettingOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css"; // Import CSS của antd
import { Outlet } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
	const [collapsed, setCollapsed] = useState(false); // Trạng thái mở/đóng sidebar
	const toggleCollapsed = () => {
		setCollapsed(!collapsed); // Đóng/mở sidebar
	};
	return (
		<Layout style={{ minHeight: "100vh" }}>
			{/* Sidebar */}
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				breakpoint="lg"
				onBreakpoint={(broken) => {
					if (broken) {
						setCollapsed(true); // Tự động đóng khi màn hình nhỏ hơn md
					} else {
						setCollapsed(false); // Mở lại khi màn hình lớn hơn md
					}
				}}
				collapsedWidth={0} // Chiều rộng sidebar khi đóng
				width={280} // Chiều rộng sidebar khi mở
				// style={{ backgroundColor: "#001529" }}
				className="bg-white " // Màu nền của sidebar
			>
				<div
					className="logo p-4 text-center text-[#333333] font-bold text-xl"
					// style={{ padding: "16px", color: "white", textAlign: "center" }}
				>
					Admin Panel
				</div>
				<Menu
					className="px-3"
					theme="light"
					mode="inline"
					defaultSelectedKeys={["1"]}
					items={[
						{ key: "1", icon: <HomeOutlined />, label: "Dashboard" },
						{ key: "2", icon: <UserOutlined />, label: "Users" },
						{ key: "3", icon: <SettingOutlined />, label: "Settings" },
					]}
				/>
			</Sider>

			{/* Main content */}
			<Layout className="site-layout">
				<Header style={{ padding: 0, background: "#fff" }}>
					<Button
						type="text"
						icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
						onClick={toggleCollapsed}
						style={{
							fontSize: "18px",
							width: 64,
							height: 64,
							border: "none",
						}}
					/>
				</Header>
				<Content
					// style={{
					// 	margin: "24px 16px",
					// 	padding: 24,
					// 	background: "#fff",
					// 	minHeight: 280,
					// }}
					className="my-6 mx-4 p-6 bg-white "
				>
					<Outlet />
					Nội dung chính
				</Content>
			</Layout>
		</Layout>
	);
};

export default AdminLayout;
