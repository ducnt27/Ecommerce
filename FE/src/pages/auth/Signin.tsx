import { Logo } from "@/common/icons";
import { Form, Input, Button } from "antd";
import React from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import { useMutation } from "@tanstack/react-query";
import { IFormUser } from "@/interfaces/user";
import { signin, signup } from "@/services/AuthService";
import { toast } from "sonner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ButtonComponent from "@/components/ButtonComponent";
import { useAuth } from "@/hooks/auth";
import instance from "@/config/instance";
import { AxiosError } from "axios";
import SiginWithGg from "./SiginWithGg";
const SignInPage = () => {
	const { setAuthUser, setIsLoggedIn } = useAuth();
	const [searchParams, SetURLSearchParams] = useSearchParams();
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const onFinish = async (values: IFormUser) => {
		try {
			const { data } = await signin(values);
			const historyUrl = searchParams.get("url");
			console.log("data signin", data);
			setAuthUser?.(data?.user);
			setIsLoggedIn?.(true);
			toast.success("Đăng nhập thành công");
			instance.defaults.headers.common.Authorization = `Bearer ${data?.accessToken}`;
			if (historyUrl) {
				const url = decodeURIComponent(historyUrl);
				window.location.href = url;
			} else {
				navigate("/");
			}
		} catch (error) {
			console.log(error);
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message);
			}
		}
	};
	return (
		<div className="min-h-screen   padding py-3">
			<div className="flex justify-between items-center ">
				<img
					src={Logo} // Replace with your logo URL
					alt="Qpay Logo"
					className=" size-[80px]"
				/>
				<Link to="/auth/register">
					<ButtonComponent
						title="Đăng ký"
						type="submit"
						className="px-[20px] py-2 text-sm rounded-lg font-medium"
					/>
				</Link>
			</div>
			<div className="bg-white/10 shadow-xl mt-10 rounded-lg w-full max-w-md px-5 md:px-12 py-8 mx-auto">
				<div className="text-center mb-8 ">
					<h2 className="text-2xl font-bold mb-2">Đăng nhập</h2>
				</div>
				<Form
					form={form}
					name="register"
					onFinish={onFinish}
					layout="vertical"
					initialValues={{ remember: true }}
					validateTrigger="onSubmit"
				>
					{/* Email */}
					<Form.Item
						name="email"
						label="Email"
						rules={[
							{
								type: "email",
								message: "Email không hợp lệ!",
							},
							{
								required: true,
								message: "Vui lòng nhập email!",
							},
						]}
					>
						<Input
							prefix={<MailOutlined />}
							placeholder="Nhập email"
							className="py-[10px] text-sm md:text-base"
						/>
					</Form.Item>

					{/* Password */}
					<Form.Item
						name="password"
						label="Mật khẩu"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập mật khẩu!",
							},
							{
								min: 6,
								message: "Mật khẩu phải có ít nhất 6 ký tự!",
							},
						]}
						hasFeedback
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Nhập mật khẩu"
							className="py-[10px] text-sm md:text-base"
						/>
					</Form.Item>

					{/* Submit Button */}
					<Form.Item className="w-full">
						{/* <Button
							htmlType="submit"
							className="border rounded-ms w-full h-10 text-base font-medium text-[#333333]"
						>
							Đăng nhập
						</Button> */}
						<ButtonComponent
							title="Đăng nhập"
							type="submit"
							className="w-full h-10 rounded-md"
						/>
					</Form.Item>
				</Form>
				<SiginWithGg />
			</div>
		</div>
	);
};

export default SignInPage;
