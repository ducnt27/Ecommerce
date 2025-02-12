import { useAuth } from "@/hooks/auth";
import { FaOpencart, FaRegUser } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import UserDropdown from "./User";
const Actions = () => {
	const { isLoggedIn, authUser } = useAuth();
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
			<Link to={`/cart`}>
				<span className="">
					<FaOpencart size={18} />
				</span>
			</Link>
		</div>
	);
};

export default Actions;
