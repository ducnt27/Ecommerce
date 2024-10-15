import { Logo } from "@/common/icons";
import { Form, Input, Button } from "antd";
import React from "react";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

import { useMutation } from "@tanstack/react-query";
import { IFormUser } from "@/interfaces/user";
import { signup } from "@/services/AuthService";
import { toast } from "sonner";
import { Link, NavLink, useNavigate } from "react-router-dom";
import ButtonComponent from "@/components/ButtonComponent";
const SignupPage = () => {
	const [form] = Form.useForm();
	const navigate = useNavigate();
	const validateConfirmPassword = ({ getFieldValue }: any) => ({
		validator(_: any, value: string) {
			if (!value || getFieldValue("password") === value) {
				return Promise.resolve();
			}
			return Promise.reject(new Error("Mật khẩu xác nhận không khớp!"));
		},
	});
	const { mutate } = useMutation({
		mutationFn: async (user: IFormUser) => {
			try {
				const data = await signup(user);
				return data;
			} catch (error) {}
		},
		onSuccess: () => {
			toast.success("Đăng kí thành công");
		},
		onError: (error) => {
			toast.error("Đăng kí thất bại");
		},
	});
	const onFinish = (values: IFormUser) => {
		console.log("Received values of form:", values);
		mutate(values);
	};
	return (
		<div className="min-h-screen  padding py-3">
			<div className="flex justify-between items-center ">
				<img
					src={Logo} // Replace with your logo URL
					alt="Qpay Logo"
					className=" size-[80px]"
				/>
				<NavLink to="/auth/signin">
					<ButtonComponent
						title="Đăng nhập"
						type="submit"
						className="px-[20px] py-2 text-sm rounded-lg font-medium"
					/>
				</NavLink>
			</div>

			<div className="bg-white/10 shadow-xl mt-10 rounded-lg w-full max-w-md px-5 md:px-12 py-8 mx-auto">
				<div className="text-center mb-8 ">
					<h2 className="text-2xl font-bold mb-2">Đăng ký</h2>
				</div>
				<Form
					form={form}
					name="register"
					onFinish={onFinish}
					layout="vertical"
					initialValues={{ remember: true }}
					validateTrigger="onSubmit"
				>
					{/* Username */}
					<Form.Item
						name="user_name"
						label="Tên đăng nhập"
						rules={[
							{
								required: true,
								message: "Vui lòng nhập tên đăng nhập!",
							},
							{
								min: 1,
								message: "Tên đăng nhập phải có ít nhất 1 ký tự!",
							},
							{
								max: 50,
								message: "Tên đăng nhập không được vượt quá 50 ký tự!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined />}
							placeholder="Nhập tên đăng nhập"
							className="py-2"
						/>
					</Form.Item>

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
							className="py-2"
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
							className="py-2"
						/>
					</Form.Item>

					{/* Confirm Password */}
					<Form.Item
						name="confirmPassword"
						label="Xác nhận mật khẩu"
						dependencies={["password"]}
						hasFeedback
						rules={[
							{
								required: true,
								message: "Vui lòng xác nhận mật khẩu!",
							},
							{
								min: 6,
								message: "Mật khẩu phải có ít nhất 6 ký tự!",
							},
							validateConfirmPassword,
						]}
					>
						<Input.Password
							prefix={<LockOutlined />}
							placeholder="Xác nhận mật khẩu"
							className="py-2"
						/>
					</Form.Item>

					{/* Submit Button */}
					<Form.Item className="w-full flex justify-center">
						<Button type="primary" htmlType="submit" className="w-[200px] h-10">
							Đăng ký
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default SignupPage;
