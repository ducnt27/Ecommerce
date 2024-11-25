import { useNavigate, useSearchParams } from "react-router-dom";

export const useRouterHistory = () => {
	const navigate = useNavigate();
	const [searchParams] = useSearchParams();
	const handleRouterHistory = () => {
		const routerHistory = searchParams.get("routerHistory"); //lấy giá trị của tham số query routerHistory từ URL (nếu có).
		if (routerHistory) {
			navigate(routerHistory);
			searchParams.delete("routerHistory");
			searchParams.sort();
			navigate(`?${searchParams.toString()}`);
		} else {
			navigate("/");
		}
	};
};
export const useCurrentRouteAndNavigation = () => {
	const navigate = useNavigate();
	const handleCurrentRoute = () => {
		const currentRouter = location.pathname; //cung cấp đường dẫn hiện tại (current route) của người dùng.
		navigate(`/auth/login?routerHistory=${currentRouter}`);
	};
	return handleCurrentRoute();
};
