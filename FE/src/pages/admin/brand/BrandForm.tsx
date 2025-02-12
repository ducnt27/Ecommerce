import { IBrand, ICategory } from "@/interfaces/products";
import { upLoadFiles } from "@/lib/utils";
import { addBrand, updateBrand } from "@/services/product/BrandService";
import {
	addCategory,
	getCategoryById,
	updateCategory,
} from "@/services/product/CategoryService";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
	open: string | boolean;
	handleBrand: () => void;
	handleClose: () => void;
};
const BrandForm = ({ open, handleClose, handleBrand }: Props) => {
	const [brand, setBrand] = useState<IBrand | null>();
	const [loading, setLoading] = useState(false);
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
					setBrand(data);
					setImageUrl(data?.thumbnail);
					form.setFieldsValue(formattedData);
				} catch (error) {
					console.log(error);
				}
			})();
		} else {
			setBrand(null);
			setImageUrl("");
		}
	}, [open]);

	const handleChangeImg = (img: string) => {
		setImageUrl(img);
	};
	const handleSubmit = async (values: IBrand) => {
		setLoading(true);
		console.log("values", values);
		try {
			const image = await upLoadFiles(values.thumbnail[0].originFileObj);
			if (brand) {
				await updateBrand(open as string, { ...values, thumbnail: image });
				toast.success("Cập nhật thành công");
				handleBrand();
				handleClose();
				return;
			}
			await addBrand({ ...values, thumbnail: image });
			form.resetFields();
			handleClose();
			handleBrand();
			toast.success("Thêm thành công");
		} catch (error) {
			toast.error("Thêm thất bại");
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
				title={
					typeof open === "string" ? "Cập nhật thương hiệu" : "Thêm thương hiệu"
				}
				// onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					onFinish={handleSubmit}
					layout="vertical"
					name="brandForm"
				>
					{/* Tên */}
					<Form.Item
						label="Tên thương hiệu"
						name="name"
						rules={[
							{ required: true, message: "Vui lòng nhập tên thương hiệu!" },
						]}
					>
						<Input placeholder="Nhập tên thương hiệu" />
					</Form.Item>

					{/* Ảnh */}
					<Form.Item
						label="Ảnh thương hiệu"
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

export default BrandForm;
