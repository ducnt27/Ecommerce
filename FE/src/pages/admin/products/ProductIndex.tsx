import { IProduct, ISearchObject } from "@/interfaces/products";
import { pagingProduct } from "@/services/product/ProductService";
import { Button, Popconfirm, Space, Tabs } from "antd";
import { ColumnsType } from "antd/es/table";
import { Table } from "antd/lib";
import React, { useEffect, useState } from "react";

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
			title: "Hành động",
			key: "actions",
			render: (_, category: IProduct) => (
				<Space>
					{category?.deleted ? (
						<Button
							// onClick={() => handleRestoreCategory(category?._id)}
							type="primary"
						>
							Khôi phục
						</Button>
					) : (
						<Popconfirm
							title="Ẩn"
							description="Bạn có muốn xóa sản phẩm này không?"
							// onConfirm={() => handleDeleteCategory(category?._id)}
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
	console.log("product", products);
	return (
		<>
			<div className="">
				<div className=""></div>
				<div className="">
					<Tabs
						activeKey={String(searchObject.tab)}
						// onChange={handleTabChange}
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
				</div>
			</div>
		</>
	);
};

export default ProductIndex;
