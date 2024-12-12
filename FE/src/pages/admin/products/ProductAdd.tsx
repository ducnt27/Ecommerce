import {
	Button,
	Checkbox,
	Form,
	Input,
	Radio,
	Select,
	Space,
	Upload,
} from "antd";
import React, { useState } from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const ProductAdd = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState("");
	const [gallery, setGallery] = useState([]);

	const [form] = Form.useForm();
	const handleSubmit = () => {};
	return (
		<div>
			<div className="">
				<h3 className="">Thêm sản phẩm</h3>
			</div>
			<div className="">
				<Form form={form} onFinish={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
						{/* <Form.Item label="Checkbox" name="disabled" valuePropName="checked">
						<Checkbox>Checkbox</Checkbox>
					</Form.Item> */}
						{/* <Form.Item label="Radio">
							<Radio.Group>
								<Radio value="apple"> Apple </Radio>
								<Radio value="pear"> Pear </Radio>
							</Radio.Group>
						</Form.Item> */}
						<Form.Item
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Tên sản phẩm"
							labelCol={{ span: 24 }}
						>
							<Input placeholder="Tên sản phẩm" className="" />
						</Form.Item>
						<Form.Item
							label="Danh mục"
							className="custom-label text-lg"
							labelCol={{ span: 24 }}
						>
							<Select placeholder="Danh mục">
								<Select.Option value="demo">Demo</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Giá sản phẩm"
							labelCol={{ span: 24 }}
						>
							<Input placeholder="Giá sản phẩm" className="" />
						</Form.Item>
						<Form.Item
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Giá khuyến mãi"
							labelCol={{ span: 24 }}
						>
							<Input placeholder="Giá khuyến mãi" className="" />
						</Form.Item>

						<Form.Item
							label="Ảnh sản phẩm"
							className="custom-label"
							labelCol={{ span: 24 }}
						>
							<Form.Item
								// label="Chọn ảnh"
								valuePropName="fileList"
								// getValueFromEvent={normFile}
							>
								<Upload action="/upload.do" listType="picture-card">
									<button
										style={{ border: 0, background: "none" }}
										type="button"
									>
										<PlusOutlined />
										<div style={{ marginTop: 8 }}>Upload</div>
									</button>
								</Upload>
							</Form.Item>
						</Form.Item>
						<Form.Item
							label="Ảnh khác"
							className="custom-label"
							labelCol={{ span: 24 }}
						>
							<Form.Item
								// label="Chọn ảnh"
								valuePropName="fileList"
								// getValueFromEvent={normFile}
							>
								<Upload action="/upload.do" listType="picture-card">
									<button
										style={{ border: 0, background: "none" }}
										type="button"
									>
										<PlusOutlined />
										<div style={{ marginTop: 8 }}>Upload</div>
									</button>
								</Upload>
							</Form.Item>
						</Form.Item>

						<Form.Item
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Số lượng"
							labelCol={{ span: 24 }}
						>
							<Input placeholder="Giá khuyến mãi" className="" />
						</Form.Item>
					</div>
					<div className="">
						<Form.List name="users">
							{(fields, { add, remove }) => (
								<>
									{fields.map(({ key, name, ...restField }) => (
										<Space
											key={key}
											style={{ display: "flex", marginBottom: 8 }}
											align="baseline"
										>
											<Form.Item
												{...restField}
												name={[name, "first"]}
												rules={[
													{ required: true, message: "Missing first name" },
												]}
											>
												<Input placeholder="First Name" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, "first"]}
												rules={[
													{ required: true, message: "Missing first name" },
												]}
											>
												<Input placeholder="First Name" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, "first"]}
												rules={[
													{ required: true, message: "Missing first name" },
												]}
											>
												<Input placeholder="First Name" />
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, "last"]}
												rules={[
													{ required: true, message: "Missing last name" },
												]}
											>
												<Input placeholder="Last Name" />
											</Form.Item>
											<MinusCircleOutlined onClick={() => remove(name)} />
										</Space>
									))}
									<Form.Item>
										<Button
											type="dashed"
											onClick={() => add()}
											block
											icon={<PlusOutlined />}
										>
											Add field
										</Button>
									</Form.Item>
								</>
							)}
						</Form.List>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default ProductAdd;
