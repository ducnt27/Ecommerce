import { useAuth } from "@/hooks/auth";
import { FaOpencart, FaRegUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
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
					<FaRegUser />
				</NavLink>
			)}
			<span className="">
				<FaOpencart size={18} />
			</span>
		</div>
	);
};

export default Actions;
