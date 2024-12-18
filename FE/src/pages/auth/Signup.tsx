import { Logo } from "@/common/icons";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";

import ButtonComponent from "@/components/ButtonComponent";
import { IFormUser } from "@/interfaces/user";
import { signup } from "@/services/AuthService";
import { AxiosError } from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
	const onFinish = async (values: IFormUser) => {
		try {
			const { data } = await signup(values);
			toast.success("Đăng kí thành công");
			navigate("/auth/login");
		} catch (error) {
			if (error instanceof AxiosError) {
				toast.error(error.response?.data?.message);
			}
		}
	};
	return (
		<div className="min-h-screen  padding py-3">
			<div className="flex justify-between items-center ">
				<img
					src={Logo} // Replace with your logo URL
					alt=""
					className=" size-[80px]"
				/>
				<NavLink to="/auth/login">
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
						name="full_name"
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
							className="py-[10px] text-sm md:text-base"
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
							className="py-[10px] text-sm md:text-base"
						/>
					</Form.Item>

					{/* Submit Button */}
					<Form.Item className=" w-full ">
						<ButtonComponent
							title="Đăng nhập"
							type="submit"
							className="w-full h-11 rounded-md"
						/>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default SignupPage;
