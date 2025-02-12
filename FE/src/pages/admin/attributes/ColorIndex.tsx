import {
	deleteCategoryById,
	getAll,
	restoreCategoryById,
} from "@/services/product/CategoryService";
import {
	Button,
	message,
	Pagination,
	Popconfirm,
	Space,
	Table,
	Tabs,
} from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { IColor, ISearchObject } from "@/interfaces/products";
import {
	deleteColor,
	getAllColors,
	restoreColor,
} from "@/services/product/ColorService";
import ColorForm from "./ColorForm";

const ColorIndex: React.FC = () => {
	const [data, setData] = useState<IColor[]>([]); // Category data
	const [loading, setLoading] = useState<boolean>(false); // Loading state
	const [isOpen, setIsOpen] = useState<boolean | string>(false);
	const [searchObject, setSearchObject] = useState<ISearchObject>({
		page: 1,
		pageSize: 2,
		tab: 1,
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 2,
		total: 0,
	}); // Pagination state

	// Fetch categories
	const fetchColor = async (searchObject: ISearchObject) => {
		try {
			setLoading(true);
			const response = await getAllColors(); // Fetch data from API
			const { data, total } = response.data;
			setData(data);

			setPagination((prev) => ({ ...prev, total }));
		} catch (error) {
			message.error("Lỗi khi tải dữ liệu danh mục.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchColor(searchObject); // Fetch categories when searchObject changes
	}, [searchObject]);

	const handleDeleteColor = async (id: string) => {
		try {
			await deleteColor(id);
			// setData(data.filter((color) => color._id !== id));
			fetchColor(searchObject);
			toast.success("Ẩn màu sắc thành công");
		} catch (error) {
			console.log(error);
			toast.error("Ẩn thất bại");
		}
	};
	const handleRestoreColor = async (id: string) => {
		try {
			await restoreColor(id);
			// setData(data.filter((cate) => cate._id !== id));
			fetchColor(searchObject);
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
		setPagination((prev) => ({
			...prev,
			current: 1, // Reset current page to 1 when tab changes
		}));
	};

	const columns: ColumnsType<IColor> = [
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
			title: "Mã màu",
			dataIndex: "code",
			key: "code",
		},
		{
			title: "Màu",
			dataIndex: "code",
			key: "code",
			render: (code) => (
				<div
					style={{
						width: 20,
						height: 20,
						backgroundColor: code,
						borderRadius: "50%",
						border: "1px solid #ccc",
					}}
				/>
			),
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, color: IColor) => (
				<Space>
					{color?.deleted ? (
						<Button
							onClick={() => handleRestoreColor(color?._id)}
							type="primary"
						>
							Khôi phục
						</Button>
					) : (
						<Popconfirm
							title="Ẩn"
							description="Bạn có muốn ẩn màu sắc này  này không?"
							onConfirm={() => handleDeleteColor(color?._id)}
							okText="Ẩn"
							cancelText="Không"
						>
							<Button variant="solid" color="danger">
								Ẩn
							</Button>
						</Popconfirm>
					)}
					<Button onClick={() => setIsOpen(color?._id)}>Sửa</Button>
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
			<ColorForm
				open={isOpen}
				handleClose={() => setIsOpen(false)}
				handleColor={() => fetchColor(searchObject)}
			/>
		</div>
	);
};

export default ColorIndex;
