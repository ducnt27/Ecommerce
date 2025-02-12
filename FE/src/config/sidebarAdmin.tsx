import {
	AppstoreOutlined,
	ContainerOutlined,
	DesktopOutlined,
	MailOutlined,
	PieChartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];
export const items: MenuItem[] = [
	{ key: "/", icon: <PieChartOutlined />, label: "Trang chủ" },
	{ key: "/dashboard", icon: <DesktopOutlined />, label: "Dashboard" },
	{ key: "/settings", icon: <ContainerOutlined />, label: "Cài đặt" },
	{
		key: "sub1",
		label: "Sản phẩm",
		icon: <MailOutlined />,
		children: [
			{ key: "/admin/category", label: "Danh mục" },
			{ key: "/admin/brand", label: "Thương hiệu" },
			{ key: "/admin/products", label: "Sản phẩm" },
			{ key: "/admin/products/add", label: "Thêm sản phẩm" },
		],
	},
	{
		key: "su2",
		label: "Biến thể",
		icon: <MailOutlined />,
		children: [
			{ key: "/admin/attributes/color", label: "Màu sắc" },
			{ key: "/admin/attributes/size", label: "Kích thước" },
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
