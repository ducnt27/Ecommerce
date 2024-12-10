import { upLoadFiles } from "@/lib/utils";
import { addCategory, ICategory } from "@/services/product/CategoryService";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
	handleCategory: () => void;
};
const CategoryForm = ({ handleCategory }: Props) => {
	const [category, setCategory] = useState<ICategory>();
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState("");
	const showModal = () => {
		setOpen(true);
	};
	console.log("img", imageUrl);
	const handleOk = () => {
		setTimeout(() => {
			setLoading(false);
			// setOpen(false);
		}, 2000);
	};
	const handleChangeImg = (img: string) => {
		setImageUrl(img);
	};
	const handleSubmit = async (values: ICategory) => {
		setLoading(true);
		try {
			const imageUrl = await upLoadFiles(values.thumbnail[0].originFileObj);
			await addCategory({ ...values, thumbnail: imageUrl });
			setOpen(false);
			form.resetFields();
			handleCategory();
			toast.success("Thêm danh mục thành công");
		} catch (error) {
			toast.error("Thêm danh mục thất bại");
			console.log(error);
		} finally {
			setLoading(false);
		}
	};
	const handleCancel = () => {
		setOpen(false);
		form.resetFields();
	};
	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Thêm sản phẩm
			</Button>
			<Modal
				open={open}
				title="Thêm danh mục"
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					name="categoryForm"
				>
					{/* Tên */}
					<Form.Item
						label="Tên danh mục"
						name="name"
						rules={[{ required: true, message: "Vui lòng nhập tên danh mục!" }]}
					>
						<Input placeholder="Nhập tên danh mục" />
					</Form.Item>

					{/* Ảnh */}
					<Form.Item
						label="Ảnh danh mục"
						name="thumbnail"
						onMetaChange={() => handleChangeImg}
						valuePropName="fileList"
						getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
						rules={[{ required: true, message: "Vui lòng tải lên ảnh!" }]}
					>
						<Upload
							name="thumbnail"
							listType="picture"
							maxCount={1}
							beforeUpload={() => false} // Không upload tự động
						>
							<Button icon={<UploadOutlined />}>Tải lên ảnh</Button>
						</Upload>
					</Form.Item>

					{/* Mô tả */}

					<Button type="primary" htmlType="submit" loading={loading}>
						Thêm
					</Button>
				</Form>
			</Modal>
		</div>
	);
};

export default CategoryForm;
