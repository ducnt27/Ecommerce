import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	timeout: 5000,
	headers: { "X-Custom-Header": "foobar" },
});

const refreshToken = async () => {
	try {
		const response = await axios.post(
			`${process.env.VITE_BASE_URL}/auth/refreshToken`,
			{},
			{
				withCredentials: true,
			},
		);
		console.log("data", response);
		return response?.data?.accessToken;
	} catch (error) {
		console.log(error);
	}
};
// instance.interceptors.request.use(
// 	async function (config) {
// 		config.withCredentials = true; // Gửi cookie với tất cả các yêu cầu
// 		return config; // Trả về config đã được cập nhật để tiếp tục xử lý yêu cầu
// 	},
// 	function (error) {
// 		console.log("error", error); // Log lỗi nếu có
// 		return Promise.reject(error); // Trả về Promise bị từ chối khi có lỗi
// 	},
// );

// instance.interceptors.response.use(
// 	(response) => {
// 		return response;
// 	},
// 	async (error) => {
// 		const originalRequest = error.config;
// 		// If error is 401 and it's not a retry, attempt to refresh the token
// 		console.log(error);
// 		if (error.response.status === 401) {
// 			originalRequest._retry = true;
// 			try {
// 				const newToken = await refreshToken();
// 				instance.defaults.headers.common["Authorization"] =
// 					`Bearer ${newToken}`;
// 				originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
// 				return instance(originalRequest);
// 			} catch (refreshError) {
// 				// Handle refresh token failure, possibly logging out the user
// 				console.error("Refresh token failed", refreshError);
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	},
// );

export default instance;
