import { ConfigProvider, DatePicker, Form, Input } from "antd";
import moment from "moment";
import viVN from "antd/lib/locale/vi_VN";
import "moment/locale/vi";
const AccountIndex = () => {
	const [form] = Form.useForm();
	const onFinish = () => {
		console.log("");
	};
	moment.locale("vi");
	return (
		<>
			<div className="">
				<div className="">
					<h3 className="">Hồ Sơ Của Tôi</h3>
					<span className="">
						Quản lý thông tin hồ sơ để bảo mật tài khoản của bạn
					</span>
				</div>
				<div className="">
					<Form
						form={form}
						name="profile"
						onFinish={onFinish}
						layout="vertical"
						initialValues={{ remember: true }}
						validateTrigger="onSubmit"
					>
						<Form.Item
							name="full_name"
							label="Tên đăng nhập"
							rules={[
								{
									type: "string",
									message: "Tên đăng nhập không hợp lệ!",
								},
								{
									required: true,
									message: "Vui lòng nhập tên đăng nhập!",
								},
							]}
						>
							<Input
								// prefix={<MailOutlined />}
								placeholder="Nhập tên đăng nhập"
								className="py-[10px] text-sm md:text-base"
							/>
						</Form.Item>

						<Form.Item
							name="email"
							label="Email"
							initialValue=""
							rules={[
								{
									required: true,
								},
							]}
						>
							<Input disabled />
						</Form.Item>

						<Form.Item
							name="phone"
							label="Số điện thoại"
							rules={[
								{
									type: "number",
									message: "Tên đăng nhập không hợp lệ!",
								},
								{
									required: true,
									message: "Vui lòng nhập tên đăng nhập!",
								},
							]}
						>
							<Input
								// prefix={<MailOutlined />}
								placeholder="Nhập tên số điện thoại"
								pattern="^\d{10}$"
								title="Số điện thoại phải có đúng 10 chữ số!"
								className="py-[10px] text-sm md:text-base"
							/>
						</Form.Item>
						<Form.Item label="Ngày sinh" name="birthDay">
							<ConfigProvider locale={viVN}>
								<DatePicker format="DD/MM/YYYY" placeholder="Chọn ngày" />
							</ConfigProvider>
						</Form.Item>
					</Form>
				</div>
			</div>
		</>
	);
};

export default AccountIndex;
