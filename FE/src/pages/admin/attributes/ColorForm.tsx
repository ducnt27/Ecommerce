import { ICategory, IColor } from "@/interfaces/products";
import { upLoadFiles } from "@/lib/utils";
import {
	addCategory,
	getCategoryById,
	updateCategory,
} from "@/services/product/CategoryService";
import {
	addColor,
	getColorById,
	updateColor,
} from "@/services/product/ColorService";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Props = {
	open: string | boolean;
	handleColor: () => void;
	handleClose: () => void;
};
const ColorForm = ({ open, handleClose, handleColor }: Props) => {
	const [color, setColor] = useState<IColor | null>();
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	console.log("id", open);
	useEffect(() => {
		if (typeof open === "string") {
			(async () => {
				try {
					const { data } = await getColorById(open as string);
					// Chuyển đổi dữ liệu thumbnail sang định dạng phù hợp cho Upload
					console.log("dataColor", data?.data);
					const formattedData = {
						name: data?.data.name,
						code: data?.data.code,
					};
					setColor(data);
					form.setFieldsValue(formattedData);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setColor(null);
		}
	}, [open]);
	// console.log("color", color);

	const handleSubmit = async (values: IColor) => {
		setLoading(true);
		console.log("values", values);
		try {
			if (color) {
				await updateColor(open as string, values);
				toast.success("Cập nhật màu sắc thành công");
				handleColor();
				handleClose();
				return;
			}
			await addColor(values);
			form.resetFields();
			handleClose();
			handleColor();
			toast.success("Thêm danh mục thành công");
		} catch (error) {
			toast.error("Thêm danh mục thất bại");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const handleCancel = () => {
		handleClose();
		form.resetFields();
	};
	return (
		<div>
			<Modal
				open={!!open}
				title={typeof open === "string" ? "Cập nhật danh mục" : "Thêm danh mục"}
				// onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form form={form} onFinish={handleSubmit} layout="vertical">
					{/* Tên */}
					<Form.Item
						label="Tên màu sắc"
						name="name"
						rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
					>
						<Input placeholder="Nhập tên danh mục" />
					</Form.Item>

					{/* Ảnh */}
					<Form.Item
						label="Mã màu"
						name="code"
						rules={[{ required: true, message: "Vui lòng chọn mã màu!" }]}
					>
						<div className="space-y-4">
							<Input
								type="color"
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
									const selectedColor = e.target.value;
									form.setFieldsValue({ code: selectedColor }); // Cập nhật mã màu vào ô input
								}}
							/>
							<Input
								placeholder="Nhập mã màu"
								value={form.getFieldValue("code")}
							/>
						</div>
					</Form.Item>

					<Button type="primary" htmlType="submit" loading={loading}>
						{typeof open === "string" ? "Cập nhật" : "Thêm"}
					</Button>
				</Form>
			</Modal>
		</div>
	);
};

export default ColorForm;
