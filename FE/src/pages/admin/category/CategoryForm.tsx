import { ICategory } from "@/interfaces/products";
import { upLoadFiles } from "@/lib/utils";
import {
	addCategory,
	getCategoryById,
	updateCategory,
} from "@/services/product/CategoryService";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

type Props = {
	open: string | boolean;
	handleCategory: () => void;
	handleClose: () => void;
};
const CategoryForm = ({ open, handleClose, handleCategory }: Props) => {
	const [category, setCategory] = useState<ICategory | null>();
	const [loading, setLoading] = useState(false);
	const { id } = useParams();
	console.log("id", open);
	const [form] = Form.useForm();
	const [imageUrl, setImageUrl] = useState("");
	// const showModal = () => {
	// 	setOpen(true);
	// };
	useEffect(() => {
		if (typeof open === "string") {
			(async () => {
				try {
					const { data } = await getCategoryById(open as string);
					// Chuyển đổi dữ liệu thumbnail sang định dạng phù hợp cho Upload
					const formattedData = {
						name: data.name,
						thumbnail: data.thumbnail
							? [
									{
										uid: "-1", // ID tạm thời
										name: "Uploaded Image", // Tên hiển thị
										status: "done", // Trạng thái của ảnh
										url: data.thumbnail, // URL của ảnh từ API
									},
								]
							: [],
					};
					setCategory(data);
					setImageUrl(data?.thumbnail);
					form.setFieldsValue(formattedData);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setCategory(null);
			setImageUrl("");
		}
	}, [open]);
	console.log("category", category);
	// const handleOk = () => {
	// 	setTimeout(() => {
	// 		setLoading(false);
	// 		// setOpen(false);
	// 	}, 2000);
	// };
	const handleChangeImg = (img: string) => {
		setImageUrl(img);
	};
	const handleSubmit = async (values: ICategory) => {
		setLoading(true);
		console.log("thumbnail", values.thumbnail);
		try {
			const image = await upLoadFiles(values.thumbnail[0].originFileObj);
			if (category) {
				await updateCategory(open as string, { ...values, thumbnail: image });
				toast.success("Cập nhật danh mục thành công");
				handleCategory();
				handleClose();
				return;
			}
			await addCategory({ ...values, thumbnail: image });
			form.resetFields();
			handleClose();
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
							defaultFileList={
								imageUrl
									? [
											{
												uid: "-1",
												name: "Ảnh hiện tại",
												status: "done",
												url: imageUrl,
											},
										]
									: []
							}
						>
							<Button icon={<UploadOutlined />}>
								{typeof open === "string" ? "Thay đổi ảnh" : "Tải ảnh lên"}
							</Button>
						</Upload>
					</Form.Item>

					{/* Mô tả */}

					<Button type="primary" htmlType="submit" loading={loading}>
						{typeof open === "string" ? "Cập nhật" : "Thêm"}
					</Button>
				</Form>
			</Modal>
		</div>
	);
};

export default CategoryForm;
