import { HomeOutlined, SettingOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useState } from "react";
import App from "./Menu";
const SideBar = (prop: any) => {
	const { Sider } = Layout;
	const [collapsed, setCollapsed] = useState(false); // Trạng thái mở/đóng sidebar
	const toggleCollapsed = () => {
		setCollapsed(!collapsed); // Đóng/mở sidebar
	};
	return (
		<div>
			<Sider
				trigger={null}
				collapsible
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
			</Sider>
		</div>
	);
};

export default SideBar;
