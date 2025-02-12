import { ICategory, IColor, ISize } from "@/interfaces/products";
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
import {
	addSize,
	getSizeById,
	updateSize,
} from "@/services/product/SizeService";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Props = {
	open: string | boolean;
	handleSize: () => void;
	handleClose: () => void;
};
const SizeForm = ({ open, handleClose, handleSize }: Props) => {
	const [size, setSize] = useState<ISize | null>();
	const [loading, setLoading] = useState(false);
	const [form] = Form.useForm();
	console.log("id", open);
	useEffect(() => {
		if (typeof open === "string") {
			(async () => {
				try {
					const { data } = await getSizeById(open as string);
					// Chuyển đổi dữ liệu thumbnail sang định dạng phù hợp cho Upload
					console.log("dataSize", data?.data);
					const formattedData = {
						name: data?.data.name,
					};
					setSize(data);
					form.setFieldsValue(formattedData);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setSize(null);
		}
	}, [open]);
	// console.log("color", color);

	const handleSubmit = async (values: IColor) => {
		setLoading(true);
		console.log("values", values);
		try {
			if (size) {
				await updateSize(open as string, values);
				toast.success("Cập nhật kích thước thành công");
				handleSize();
				handleClose();
				return;
			}
			await addSize(values);
			form.resetFields();
			handleClose();
			handleSize();
			toast.success("Thêm kích thước thành công");
		} catch (error) {
			if (size) {
				toast.error("Cập nhật kích thước thất bại");
			}
			toast.error("Thêm kích thước thất bại");
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
						label="Kích thước"
						name="name"
						rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
					>
						<Input placeholder="Nhập kích thước" />
					</Form.Item>

					<Button type="primary" htmlType="submit" loading={loading}>
						{typeof open === "string" ? "Cập nhật" : "Thêm"}
					</Button>
				</Form>
			</Modal>
		</div>
	);
};

export default SizeForm;
