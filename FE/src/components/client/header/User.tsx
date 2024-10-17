import React from "react";
import { Menu, Dropdown, Badge, Avatar } from "antd";
import { LuUser } from "react-icons/lu";
import { AiOutlineSetting, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import { UserOutlined } from "@ant-design/icons";
import { useAuth } from "@/hooks/auth";
import { NavLink } from "react-router-dom";
import { logout } from "@/services/AuthService";

const UserDropdown = () => {
	const { authUser, setAuthUser, setIsLoggedIn } = useAuth();
	console.log("authUseadadadr", authUser);
	// Menu items
	const handleLogout = async () => {
		try {
			await logout();
			setAuthUser?.(undefined);
			setIsLoggedIn?.(false);
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};
	const menu = (
		<Menu
			items={[
				{
					key: "1",
					label: (
						<NavLink to="/admin">
							{authUser?.is_admin && " Vào trang quản trị"}
						</NavLink>
					),
				},
				{
					key: "1",
					label: <NavLink to="/admin">Tài khoản của tôi</NavLink>,
				},
				{
					key: "1",
					label: <NavLink to="/admin">Đơn hàng</NavLink>,
				},
				{
					key: "1",
					label: <button onClick={() => handleLogout()}> Đăng xuất</button>,
					icon: <FiLogOut className="text-red-500" />,
				},
			]}
		/>
	);

	return (
		<div className="flex items-center space-x-4">
			{/* <Badge count={13}>
				<AiOutlineShoppingCart size={18} />
			</Badge> */}
			<Dropdown overlay={menu} placement="bottomRight" arrow>
				<div className="flex gap-2 items-center cursor-pointer">
					<Avatar
						size="small"
						icon={<UserOutlined />}
						src="https://example.com/avatar.jpg" // Thay bằng URL ảnh avatar thật
					/>
					<span className="text-base font-medium">{authUser?.full_name}</span>
				</div>
			</Dropdown>
		</div>
	);
};

export default UserDropdown;
