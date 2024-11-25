import React from "react";
import {
	getAdditionalUserInfo,
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import app from "@/config/firebaseConfig ";
import { useAuth } from "@/hooks/auth";
import { useRouterHistory } from "@/hooks/router";
import { getActiveResourcesInfo } from "process";
import { socialUser } from "@/services/AuthService";
import { toast } from "sonner";
const SiginWithGg = () => {
	const auth = getAuth(app);
	const { setAuthUser, setIsLoggedIn } = useAuth();
	const routerHistory = useRouterHistory();
	const handleSignInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		provider.addScope("https://www.googleapis.com/auth/userinfo.email");
		console.log("pro", provider);
		try {
			// Đăng nhập với Google
			const result = await signInWithPopup(auth, provider);
			// Lấy thêm thông tin người dùng
			const user = getAdditionalUserInfo(result);
			console.log("user", user);
			// Tạo payload để gửi tới backend
			const payload = {
				email: user?.profile?.email,
				full_name: user?.profile?.name,
				picture: user?.profile?.picture,
				uid: user?.profile?.id,
				provider: user?.providerId,
			};
			// Gửi thông tin người dùng tới backend
			const { data } = await socialUser(payload);

			// Cập nhật trạng thái người dùng trong ứng dụng
			setAuthUser?.(data?.user);
			setIsLoggedIn?.(true);
			localStorage.setItem("token", data?.accessToken);
			toast.success(data?.message);
			routerHistory;
		} catch (error) {}
	};
	return (
		<>
			<div className="grid grid-cols-6 gap-x-4 *:border *:border-gray-200 *:rounded-lg  ">
				<div
					className="col-span-6 bg-black/10 flex items-center gap-3 justify-center p-2 max-h-10 cursor-pointer hover:bg-gray-100"
					onClick={handleSignInWithGoogle}
				>
					<FcGoogle size={24} />
					<span className="text-sm">Đăng nhập với Google</span>
				</div>
			</div>
		</>
	);
};

export default SiginWithGg;
