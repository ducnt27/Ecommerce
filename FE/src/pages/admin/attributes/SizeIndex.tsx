import { ISize } from "@/interfaces/products";
import {
	deleteSize,
	paginateSize,
	restoreSizeById,
} from "@/services/product/SizeService";
import { Button, message, Popconfirm, Space, Table, Tabs } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SizeForm from "./SizeForm";

const SizeIndex: React.FC = () => {
	const [data, setData] = useState<ISize[]>([]); // Category data
	const [loading, setLoading] = useState<boolean>(false); // Loading state
	const [isOpen, setIsOpen] = useState<boolean | string>(false);
	const [searchObject, setSearchObject] = useState<any>({
		page: 1,
		pageSize: 2,
		tab: 1,
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 2,
		total: 0,
	});
	console.log("data", data);
	// Fetch categories
	const fetchSize = async (searchObject: any) => {
		try {
			setLoading(true);
			const response = await paginateSize(searchObject); // Fetch data from API
			console.log("response: ", response);
			const { data, total } = response.data;
			setData(data);
			setPagination((prev) => ({ ...prev, total }));
		} catch (error) {
			message.error("Lỗi khi tải dữ liệu kích thước.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchSize(searchObject); // Fetch categories when searchObject changes
	}, [searchObject]);

	const handleDeleteSize = async (id: string) => {
		try {
			await deleteSize(id);
			setData(data.filter((color) => color._id !== id));
			fetchSize(searchObject);
			toast.success("Ẩn màu sắc thành công");
		} catch (error) {
			console.log(error);
			toast.error("Ẩn thất bại");
		}
	};
	const handleRestoreSize = async (id: string) => {
		try {
			await restoreSizeById(id);
			setData(data.filter((cate) => cate._id !== id));
			fetchSize(searchObject);
			toast.success("Khôi phục màu sắc thành công");
		} catch (error) {
			console.log(error);
			toast.error("Khôi phục thất bại");
		}
	};
	// Handle pagination change
	const handleTableChange = (paginationConfig: any) => {
		setPagination((prev) => ({
			...prev,
			current: paginationConfig.current,
			pageSize: paginationConfig.pageSize,
		}));

		// Update searchObject with the new page
		setSearchObject((prev: any) => ({
			...prev,
			page: paginationConfig.current,
			pageSize: paginationConfig.pageSize,
		}));
	};

	// Handle tab change
	const handleTabChange = (key: string) => {
		setSearchObject((prev: any) => ({
			...prev,
			tab: parseInt(key), // Change the tab value
			page: 1, // Reset page to 1 when tab changes
		}));
		setPagination((prev) => ({
			...prev,
			current: 1, // Reset current page to 1 when tab changes
		}));
	};

	const columns: ColumnsType<ISize> = [
		{
			title: "STT",
			dataIndex: "_id",
			render: (_, __, index) =>
				index + 1 + (pagination.current - 1) * pagination.pageSize,
			width: "10%",
		},
		{
			title: "Kích thước",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, size: ISize) => (
				<Space>
					{size?.deleted ? (
						<Button onClick={() => handleRestoreSize(size?._id)} type="primary">
							Khôi phục
						</Button>
					) : (
						<Popconfirm
							title="Ẩn"
							description="Bạn có muốn ẩn kích thước này  này không?"
							onConfirm={() => handleDeleteSize(size?._id)}
							okText="Ẩn"
							cancelText="Không"
						>
							<Button variant="solid" color="danger">
								Ẩn
							</Button>
						</Popconfirm>
					)}
					<Button onClick={() => setIsOpen(size?._id)}>Sửa</Button>
				</Space>
			),
		},
	];

	return (
		<div>
			<div className="">
				<Button onClick={() => setIsOpen(true)} type="primary">
					Thêm màu sắc
				</Button>
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
			{/* <Pagination
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
			/> */}
			<SizeForm
				open={isOpen}
				handleClose={() => setIsOpen(false)}
				handleSize={() => fetchSize(searchObject)}
			/>
		</div>
	);
};

export default SizeIndex;
