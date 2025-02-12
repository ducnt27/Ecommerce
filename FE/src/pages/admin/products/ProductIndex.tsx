import { IProduct, ISearchObject } from "@/interfaces/products";
import { cn } from "@/lib/utils";
import {
	deleteProduct,
	pagingProduct,
	restoreProduct,
} from "@/services/product/ProductService";
import { Button, Pagination, Popconfirm, Space, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const ProductIndex = () => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [loading, setLoading] = useState<boolean>(false); // Loading state
	const [searchObject, setSearchObject] = useState<ISearchObject>({
		page: 1,
		pageSize: 5,
		tab: 1,
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 5,
		total: 0,
	});
	const handleProducts = async (searchObject: ISearchObject) => {
		try {
			const response = await pagingProduct(searchObject);
			setProducts(response.data.data);
			// setPagination((prev) => ({ ...prev, total }));
		} catch (error) {
			console.error(error);
		}
	};
	useEffect(() => {
		handleProducts(searchObject);
	}, [searchObject]);
	const handleDeleteById = async (id: string) => {
		try {
			await deleteProduct(id);
			setProducts(products.filter((product) => product._id !== id));
			toast.success("Xóa sản phẩm thành công");
		} catch (error) {
			console.log(error);
		}
	};
	const handleRestoreById = async (id: string) => {
		try {
			await restoreProduct(id);
			setProducts(products.filter((product) => product._id !== id));
			toast.success("Khôi phục sản phẩm thành công");
		} catch (error) {
			console.log(error);
		}
	};
	const columns: ColumnsType<IProduct> = [
		{
			title: "STT",
			dataIndex: "_id",
			render: (_, __, index) =>
				index + 1 + (pagination.current - 1) * pagination.pageSize,
			width: "10%",
		},
		{
			title: "Ảnh",
			dataIndex: "image",
			render: (image) => (
				<img
					src={image}
					alt=""
					className="w-[100px] h-[100px]  object-contain"
				/>
			),
		},
		{
			title: "Tên",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Danh mục",
			dataIndex: "category",
			key: "category",
			render: (category) => category?.name,
		},
		{
			title: "Giá gốc",
			dataIndex: "price",
			render: (price) => `${price}đ`,
		},
		{
			title: "Giá KM",
			dataIndex: "discount",
			render: (discount) => `${discount}đ`,
		},
		{
			title: "SL",
			dataIndex: "quantity",
			key: "quantity",
		},
		{
			title: "Hot",
			key: "featured",
			render: (_, product: IProduct) => {
				console.log("featured", product.featured);
				return (
					<span
						className={cn(
							product.featured === false
								? "bg-gray-500 px-2 border border-transparent rounded-full "
								: "bg-red-500 px-2 border border-transparent rounded-full",
							"",
						)}
					></span>
				);
			},
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, product: IProduct) => (
				<Space>
					{product?.deleted ? (
						<Button
							onClick={() => handleRestoreById(product?._id)}
							type="primary"
						>
							Khôi phục
						</Button>
					) : (
						<Popconfirm
							title="Ẩn"
							description="Bạn có muốn ẩn sản phẩm này không?"
							onConfirm={() => handleDeleteById(product?._id)}
							okText="Ẩn"
							cancelText="Không"
						>
							<Button variant="solid" color="danger">
								Ẩn
							</Button>
						</Popconfirm>
					)}
					<Button>Sửa</Button>
				</Space>
			),
		},
	];
	const handleTabChange = (key: string) => {
		setSearchObject((prev) => ({
			...prev,
			tab: parseInt(key), // Change the tab value
			page: 1, // Reset page to 1 when tab changes
		}));
		setPagination((prev) => ({
			...prev,
			current: 1, // Reset current page to 1 when tab changes
		}));
	};
	return (
		<>
			<div className="">
				<div className=""></div>
				<div className="">
					<Tabs
						activeKey={String(searchObject.tab)}
						onChange={handleTabChange}
						tabBarStyle={{ marginBottom: 24 }}
					>
						<Tabs.TabPane tab="Danh mục hiện tại" key="1">
							<Table
								loading={loading}
								columns={columns}
								dataSource={products}
								rowKey="_id"
								pagination={false}
							/>
						</Tabs.TabPane>
						<Tabs.TabPane tab="Danh mục bị ẩn" key="-1">
							<Table
								loading={loading}
								columns={columns}
								dataSource={products}
								rowKey="_id"
								pagination={false}
							/>
						</Tabs.TabPane>
					</Tabs>
					<Pagination
						current={pagination.current}
						pageSize={pagination.pageSize}
						total={pagination.total}
						onChange={(page, pageSize) => {
							setSearchObject((prev) => ({
								...prev,
								page,
								pageSize,
							}));
							setPagination((prev) => ({
								...prev,
								current: page,
								pageSize,
							}));
						}}
						// onChange={handleTableChange}
						// showSizeChanger
						// pageSizeOptions={["10", "20", "30", "50"]}
						style={{ marginTop: 16 }}
					/>
				</div>
			</div>
		</>
	);
};

export default ProductIndex;
