import React, { useEffect, useState } from "react";
import {
	Table,
	Tabs,
	Button,
	message,
	Pagination,
	Space,
	Popconfirm,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAll, ISearchObject } from "@/services/product/CategoryService";
import { TabsPosition } from "antd/lib/tabs";
import CategoryForm from "./CategoryForm";

interface ICategory {
	_id: string;
	name: string;
	description: string;
	image: string;
	actions?: string;
}

const CategoryPage: React.FC = () => {
	const [data, setData] = useState<ICategory[]>([]); // Category data
	const [loading, setLoading] = useState<boolean>(false); // Loading state
	const [searchObject, setSearchObject] = useState<ISearchObject>({
		page: 1,
		pageSize: 10,
		tab: 1,
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 10,
		total: 0,
	}); // Pagination state

	// Fetch categories
	const fetchCategories = async (searchObject: ISearchObject) => {
		try {
			setLoading(true);
			const response = await getAll(searchObject); // Fetch data from API
			const { data: categories, total } = response.data;
			setData(categories);

			setPagination((prev) => ({ ...prev, total }));
		} catch (error) {
			message.error("Lỗi khi tải dữ liệu danh mục.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCategories(searchObject); // Fetch categories when searchObject changes
	}, [searchObject]);

	const handleDeleteCategory = async (id: string) => {
		try {
		} catch (error) {}
	};
	// Handle pagination change
	const handleTableChange = (paginationConfig: any) => {
		setPagination((prev) => ({
			...prev,
			current: paginationConfig.current,
			pageSize: paginationConfig.pageSize,
		}));

		// Update searchObject with the new page
		setSearchObject((prev) => ({
			...prev,
			page: paginationConfig.current,
			pageSize: paginationConfig.pageSize,
		}));
	};

	// Handle tab change
	const handleTabChange = (key: string) => {
		setSearchObject((prev) => ({
			...prev,
			tab: parseInt(key), // Change the tab value
			page: 1, // Reset page to 1 when tab changes
		}));
	};

	const columns: ColumnsType<ICategory> = [
		{
			title: "STT",
			dataIndex: "_id",
			render: (_, __, index) =>
				index + 1 + (pagination.current - 1) * pagination.pageSize,
			width: "10%",
		},
		{
			title: "Tên",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Ảnh",
			dataIndex: "thumbnail",
			render: (thumbnail) => (
				<img
					src={thumbnail}
					alt="category"
					className="w-[100px] h-[100px]  object-contain"
				/>
			),
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, categories: ICategory) => (
				<Space>
					<Popconfirm
						title="Xóa"
						description="Bạn có muốn xóa sản phẩm này không?"
						onConfirm={() => handleDeleteCategory(categories?._id)}
						okText="Xóa"
						cancelText="Không"
					>
						<Button type="primary">Xóa</Button>
					</Popconfirm>
					<Button onClick={() => fetchCategories(searchObject)}>Sửa</Button>
				</Space>
			),
		},
	];

	return (
		<div>
			<div className="">
				<CategoryForm handleCategory={() => fetchCategories(searchObject)} />
			</div>
			<Tabs
				activeKey={String(searchObject.tab)} // Set active tab based on searchObject.tab
				onChange={handleTabChange}
				tabBarStyle={{ marginBottom: 24 }}
			>
				<Tabs.TabPane tab="Danh mục hiện tại" key="1">
					<Table
						loading={loading}
						columns={columns}
						dataSource={data}
						rowKey="_id"
						pagination={false}
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Danh mục bị ẩn" key="-1">
					<Table
						loading={loading}
						columns={columns}
						dataSource={data}
						rowKey="_id"
						pagination={false}
					/>
				</Tabs.TabPane>
			</Tabs>

			{/* Pagination */}
			<Pagination
				current={pagination.current}
				pageSize={pagination.pageSize}
				total={pagination.total}
				onChange={(page, pageSize) =>
					setSearchObject((prev) => ({
						...prev,
						page,
						pageSize,
					}))
				}
				showSizeChanger
				pageSizeOptions={["10", "20", "30", "50"]}
				style={{ marginTop: 16 }}
			/>
		</div>
	);
};

export default CategoryPage;
