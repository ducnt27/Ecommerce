import {
	IAttribute,
	IBrand,
	ICategory,
	IColor,
	IProduct,
	ISize,
} from "@/interfaces/products";
import { cn, upLoadFiles } from "@/lib/utils";
import { getAllBrand } from "@/services/product/BrandService";
import { getAllCate } from "@/services/product/CategoryService";
import { getAllColors } from "@/services/product/ColorService";
import { createProduct } from "@/services/product/ProductService";
import { getAllSizes } from "@/services/product/SizeService";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
	Button,
	Checkbox,
	Form,
	Input,
	InputNumber,
	Select,
	Space,
} from "antd";
import { useEffect, useState } from "react";
import { AiFillCloseCircle, AiOutlineCloudUpload } from "react-icons/ai";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const ProductAdd = () => {
	const [loading, setLoading] = useState(false);
	const [imageUrl, setImageUrl] = useState<ImageListType>([]);
	const [gallery, setGallery] = useState<ImageListType>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);
	const [colors, setColors] = useState<IColor[]>([]);
	const [sizes, setSizes] = useState<ISize[]>([]);
	const [brands, setBrands] = useState<IBrand[]>([]);
	const [form] = Form.useForm();
	const navigate = useNavigate();
	useEffect(() => {
		(async () => {
			try {
				const { data: brands } = await getAllBrand();
				setBrands(brands?.data);
				const { data: categoriesData } = await getAllCate();
				setCategories(categoriesData?.data);
				const { data: sizesData } = await getAllSizes();
				setSizes(sizesData?.data);
				const { data: colorsData } = await getAllColors();
				setColors(colorsData?.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	console.log("imageUrl", imageUrl);

	const handleSubmit = async (values: any) => {
		console.log("values", values);
		setLoading(true);
		try {
			const uploadedImage = await upLoadFiles(imageUrl as any); // Hàm upload ảnh chính
			const uploadedGallery = await upLoadFiles(gallery as any);

			console.log("uploadedGallery", uploadedGallery);
			const productData = {
				...values,
				image: uploadedImage,
				gallery: uploadedGallery,
				attribute: values.attribute?.map((item: IAttribute) => {
					console.log("item", item);
					return {
						colorId: item.colorId,
						sizeId: item.sizeId,
						price: item.price,
						discount: item.discount,
						quantity: item.quantity,
					};
				}),
			};
			await createProduct(productData as IProduct);
			toast.success("Thêm sản phẩm thành công");
			// form.resetFields();
			// setGallery([]);
			// setImageUrl([]);
			// navigate("/admin/products");
		} catch (error) {
			console.log(error);
			toast.error("Có lỗi xảy ra. Vui lòng thử lại!");
		} finally {
			setLoading(false);
		}
	};

	const onChange = (imageList: ImageListType) => {
		setImageUrl(imageList.slice(0, 1));
	};

	return (
		<div>
			<div className="">
				<h3 className="">Thêm sản phẩm</h3>
			</div>
			<div className="">
				<Form form={form} onFinish={handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
						<Form.Item
							name="brand"
							label="Thương hiệu"
							className="custom-label text-lg"
							labelCol={{ span: 24 }}
							rules={[{ required: true, message: "Vui lòng chọn thương hiệu" }]}
						>
							<Select placeholder="Thương hiệu">
								{brands.map((brand) => (
									<Select.Option key={brand._id} value={brand._id}>
										{brand.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="featured"
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							// label="Sản phẩm nổi bật"
							valuePropName="checked"
						>
							<div className="w-full h-full md:mt-8 md:py-1 px-2 py-1 md:px-4 border rounded-lg">
								<Checkbox className="font-medium">Sản phẩm nổi bật</Checkbox>
							</div>
						</Form.Item>
						<Form.Item
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Tên sản phẩm"
							labelCol={{ span: 24 }}
							name="name"
							rules={[
								{ required: true, message: "Vui lòng nhập tên sản phẩm" },
							]}
						>
							<Input placeholder="Tên sản phẩm" className="" />
						</Form.Item>
						<Form.Item
							name="category"
							label="Danh mục"
							className="custom-label text-lg"
							labelCol={{ span: 24 }}
							rules={[{ required: true, message: "Vui lòng chọn danh mục" }]}
						>
							<Select placeholder="Danh mục">
								{categories.map((category) => (
									<Select.Option key={category._id} value={category._id}>
										{category.name}
									</Select.Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item
							name="price"
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Giá sản phẩm"
							labelCol={{ span: 24 }}
							rules={[
								{ required: true, message: "Vui lòng nhập giá sản phẩm" },
								{
									type: "number",
									min: 0,
									message: "Giá sản phẩm phải lớn hơn 0",
								},
							]}
						>
							<InputNumber placeholder="Giá sản phẩm" className="w-full" />
						</Form.Item>
						<Form.Item
							className="custom-label ant-form-item-label "
							style={{ fontSize: "16px" }}
							label="Giá khuyến mãi"
							name="discount"
							labelCol={{ span: 24 }}
							rules={[
								{ required: true, message: "Vui lòng nhập giá khuyến mãi" },
								{
									type: "number",
									min: 0,
									message: "Giá khuyến mãi phải lớn hơn hoặc bằng 0",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										const price = getFieldValue("price");
										if (!value || !price || value < price) {
											return Promise.resolve();
										}
										return Promise.reject(
											new Error("Giá khuyến mãi phải nhỏ hơn giá!"),
										);
									},
								}),
							]}
						>
							<InputNumber placeholder="Giá khuyến mãi" className="w-full" />
						</Form.Item>

						<Form.Item
							label="Ảnh sản phẩm"
							name="image"
							className="custom-label"
							valuePropName="fileList"
							labelCol={{ span: 24 }}
						>
							<ImageUploading
								value={imageUrl}
								onChange={onChange}
								maxNumber={1}
								dataURLKey="data_url"
							>
								{({
									imageList,
									onImageUpload,
									onImageRemove,
									isDragging,
									dragProps,
								}) => (
									<div className="border border-gray-200 rounded-lg p-3">
										<div className=" grid grid-cols-2 lg:grid-cols-3 gap-3">
											{imageList.map((image, index) => (
												<div
													key={index}
													className="relative w-[100px] h-[100px] flex border p-2 "
												>
													<img
														src={image["data_url"]}
														alt=""
														width="100"
														className="cursor-pointer object-cover aspect-square "
													/>
													<div className="absolute -top-2 -right-3">
														<button
															className=""
															type="button"
															onClick={() => onImageRemove(index)}
														>
															<AiFillCloseCircle size={20} />
														</button>
													</div>
												</div>
											))}
										</div>
										<div className="w-full flex flex-col items-center justify-center py-6">
											<button
												type="button"
												style={isDragging ? { color: "red" } : undefined}
												onClick={onImageUpload}
												className={cn(imageList.length > 0 && "hidden")}
												{...dragProps}
											>
												<AiOutlineCloudUpload size={50} strokeWidth={1} />
												Chọn ảnh
											</button>
										</div>
									</div>
								)}
							</ImageUploading>
						</Form.Item>
						<Form.Item
							label="Ảnh khác"
							className="custom-label"
							name="gallery"
							labelCol={{ span: 24 }}
						>
							<ImageUploading
								multiple
								value={gallery}
								onChange={(imageList: ImageListType) =>
									setGallery(imageList as never[])
								}
								maxNumber={5}
								dataURLKey="data_url"
							>
								{({
									imageList,
									onImageUpload,
									onImageRemove,
									isDragging,
									dragProps,
								}) => (
									<div className="border border-gray-200 rounded-lg p-3">
										<div className=" grid grid-cols-2 lg:grid-cols-3 gap-3">
											{imageList?.map((image: any, index: number) => (
												<div
													key={index}
													className="relative w-[100px] h-[100px] flex border p-2 "
												>
													<img
														src={image["data_url"]}
														alt=""
														width="100"
														className="cursor-pointer object-cover aspect-square "
													/>
													<div className="absolute -top-2 -right-3">
														<button
															className=""
															type="button"
															onClick={() => onImageRemove(index)}
														>
															<AiFillCloseCircle size={20} />
														</button>
													</div>
												</div>
											))}
										</div>
										<div className="w-full flex flex-col items-center justify-center py-6">
											<button
												type="button"
												style={isDragging ? { color: "red" } : undefined}
												onClick={onImageUpload}
												{...dragProps}
											>
												<AiOutlineCloudUpload size={50} strokeWidth={1} /> Chọn
												ảnh
											</button>
										</div>
									</div>
								)}
							</ImageUploading>
						</Form.Item>
					</div>
					<div className="">
						<Form.Item
							className="custom-label "
							style={{ fontSize: "16px" }}
							label="Biến thể"
							labelCol={{ span: 24 }}
						></Form.Item>
						<Form.List name="attribute">
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
												label="Màu sắc"
												labelCol={{ span: 24 }}
												name={[name, "colorId"]}
												rules={[
													{ required: true, message: "Vui lòng chọn màu sắc" },
												]}
											>
												<Select placeholder="Chọn màu sắc">
													{colors.map((color) => (
														<Select.Option key={color._id} value={color._id}>
															{color.name}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
											<Form.Item
												{...restField}
												name={[name, "sizeId"]}
												label="Kích thước"
												labelCol={{ span: 24 }}
												rules={[
													{
														required: true,
														message: "Vui lòng chọn kích thước",
													},
												]}
											>
												<Select placeholder="Chọn kích thước">
													{sizes.map((size) => (
														<Select.Option key={size._id} value={size._id}>
															{size.name}
														</Select.Option>
													))}
												</Select>
											</Form.Item>
											<Form.Item
												{...restField}
												label="Giá"
												labelCol={{ span: 24 }}
												name={[name, "price"]}
												rules={[
													{ required: true, message: "Vui lòng nhập giá" },
												]}
											>
												<InputNumber
													placeholder="Giá sản phẩm "
													className="w-full"
												/>
											</Form.Item>
											<Form.Item
												{...restField}
												label="Giá KM"
												labelCol={{ span: 24 }}
												name={[name, "discount"]}
												rules={[
													{ required: true, message: "Vui lòng nhập giá KM" },
												]}
											>
												<InputNumber
													placeholder="Giá khuyến mãi"
													className="w-full"
												/>
											</Form.Item>
											<Form.Item
												{...restField}
												label="Số lượng"
												labelCol={{ span: 24 }}
												name={[name, "quantity"]}
												rules={[
													{ required: true, message: "Vui lòng nhập số lượng" },
												]}
											>
												<InputNumber
													placeholder="Số lượng"
													className="w-full"
												/>
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
					<Form.Item
						label="Mô tả"
						name="description"
						className="custom-label "
						labelCol={{ span: 24 }}
						rules={[
							{ required: true, message: "Vui lòng nhập giá khuyến mãi" },
						]}
					></Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" loading={loading}>
							Thêm sản phẩm
						</Button>
					</Form.Item>
				</Form>
			</div>
		</div>
	);
};

export default ProductAdd;
