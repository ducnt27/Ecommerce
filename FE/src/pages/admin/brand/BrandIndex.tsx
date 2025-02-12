import { ISearchObject } from "@/interfaces/searchObject";
import {
	deleteBrandById,
	pagingBrand,
	restoreBrandById,
} from "@/services/product/BrandService";
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
import BrandForm from "./BrandForm";

interface ICategory {
	_id: string;
	name: string;
	image: string;
	actions?: string;
	deleted?: boolean;
}

const BrandIndex: React.FC = () => {
	const [data, setData] = useState<ICategory[]>([]); // Category data
	const [loading, setLoading] = useState<boolean>(false); // Loading state
	const [isOpen, setIsOpen] = useState<boolean | string>(false);
	const [searchObject, setSearchObject] = useState<ISearchObject>({
		page: 1,
		pageSize: 5,
		tab: 1,
	});
	const [pagination, setPagination] = useState({
		current: 1,
		pageSize: 5,
		total: 0,
	}); // Pagination state

	// Fetch categories
	const fetchBrands = async (searchObject: ISearchObject) => {
		try {
			setLoading(true);
			const response = await pagingBrand(searchObject); // Fetch data from API
			const { data: brands, total } = response.data;
			setData(brands);

			setPagination((prev) => ({ ...prev, total }));
		} catch (error) {
			toast.error("Lỗi khi tải dữ liệu.");
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		fetchBrands(searchObject); // Fetch categories when searchObject changes
	}, [searchObject]);

	const handleDeleteBrandById = async (id: string) => {
		try {
			await deleteBrandById(id);
			setData(data.filter((cate) => cate._id !== id));
			toast.success("Ẩn  thành công");
		} catch (error) {
			console.log(error);
			toast.error("Ẩn thất bại");
		}
	};
	const handleRestoreBrandById = async (id: string) => {
		try {
			await restoreBrandById(id);
			setData(data.filter((cate) => cate._id !== id));
			toast.success("Khôi phục danh mục thành công");
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
				<div className="w-[100px] h-[70px]">
					<img
						src={thumbnail}
						alt="category"
						className="w-full h-full  object-cover"
					/>
				</div>
			),
		},
		{
			title: "Hành động",
			key: "actions",
			render: (_, brand: ICategory) => (
				<Space>
					{brand?.deleted ? (
						<Button
							onClick={() => handleRestoreBrandById(brand?._id)}
							type="primary"
						>
							Khôi phục
						</Button>
					) : (
						<Popconfirm
							title="Ẩn"
							description="Bạn có muốn ẩn không?"
							onConfirm={() => handleDeleteBrandById(brand?._id)}
							okText="Ẩn"
							cancelText="Không"
						>
							<Button variant="solid" color="danger">
								Ẩn
							</Button>
						</Popconfirm>
					)}
					<Button onClick={() => setIsOpen(brand?._id)}>Sửa</Button>
				</Space>
			),
		},
	];

	return (
		<div>
			<div className="">
				<Button onClick={() => setIsOpen(true)} type="primary">
					Thêm thương hiệu
				</Button>
			</div>
			<Tabs
				activeKey={String(searchObject.tab)} // Set active tab based on searchObject.tab
				onChange={handleTabChange}
				tabBarStyle={{ marginBottom: 24 }}
			>
				<Tabs.TabPane tab="Thương hiệu hiện tại" key="1">
					<Table
						loading={loading}
						columns={columns}
						dataSource={data}
						rowKey="_id"
						pagination={false}
					/>
				</Tabs.TabPane>
				<Tabs.TabPane tab="Thương hiệu bị ẩn" key="-1">
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
			<BrandForm
				open={isOpen}
				handleClose={() => setIsOpen(false)}
				handleBrand={() => fetchBrands(searchObject)}
			/>
		</div>
	);
};

export default BrandIndex;
