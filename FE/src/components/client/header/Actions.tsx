import ButtonComponent from "@/components/ButtonComponent";
import { useAuth } from "@/hooks/auth";
import { FaOpencart } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { NavLink } from "react-router-dom";
import DropdownMenu from "./User";
import UserDropdown from "./User";

const Actions = () => {
	const { isLoggedIn, authUser } = useAuth();
	console.log("isLoggedIndâda", isLoggedIn);
	return (
		<div className="flex items-center space-x-4">
			{isLoggedIn && authUser?._id ? (
				<span className="">
					{/* <LuUser size={18} /> */}
					<UserDropdown />
				</span>
			) : (
				<NavLink to="/auth/login">
					<ButtonComponent
						title="Đăng nhập"
						type="submit"
						className="px-[20px] py-2 text-sm rounded-lg font-medium"
					/>
				</NavLink>
			)}
			<span className="">
				<FaOpencart size={18} />
			</span>
		</div>
	);
};

export default Actions;
