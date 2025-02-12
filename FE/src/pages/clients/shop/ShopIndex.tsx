import { IProduct } from "@/interfaces/products";
import { ISearchObjectProduct } from "@/interfaces/searchObject";
import { cn } from "@/lib/utils";
import { getAllProduct } from "@/services/product/ProductService";
import { useQuery } from "@tanstack/react-query";
import { Pagination, Spin } from "antd";
import { useEffect, useState } from "react";
import { GrSort } from "react-icons/gr";
import { IoFilter } from "react-icons/io5";
import { useSearchParams } from "react-router-dom";
import FilterByColor from "./filter/FillterByColor";
import FilterByCategory from "./filter/FilterByCategory";
import FilterByPrice from "./filter/FilterByPrice";
import FilterBySize from "./filter/FilterBySize";
import ProductItem from "./ProductItem";
import { motion } from "framer-motion";
const ShopIndex = () => {
	// const [isOpen, setIsOpen] = useState(false);
	const [searchParams, setSearchParams] = useSearchParams();
	const [searchParamsObject, setSearchParamsObject] =
		useState<ISearchObjectProduct>(() => {
			const paramsObject: any = Object.fromEntries(searchParams.entries());
			console.log("paramsObject", paramsObject);

			const colorCheck =
				paramsObject?.colorId
					?.split(",")
					.map((c: string) => c.trim())
					.filter(Boolean) ?? [];
			const sizeCheck =
				paramsObject?.sizeId
					?.split(",")
					.map((s: string) => s.trim())
					.filter(Boolean) ?? [];
			return {
				page: paramsObject?.page || 1,
				limit: paramsObject?.limit || 9,
				search: "",
				category: paramsObject?.category,
				colorId: colorCheck,
				sizeId: sizeCheck,
				// minPrice: parseInt(paramsObject?.minPrice) ?? 0,
				minPrice: paramsObject.minPrice ? parseInt(paramsObject?.minPrice) : 0,
				maxPrice: paramsObject.maxPrice
					? parseInt(paramsObject?.maxPrice)
					: 5000000,
				sort: paramsObject?.sort || "createdAt",
				order: paramsObject?.order || "desc",
			};
		});
	useEffect(() => {
		const paramsObject: any = Object.fromEntries(searchParams.entries());
		if (!paramsObject.page) {
			setSearchParamsObject((prev) => ({
				...prev,
				page: 1, // Reset về trang đầu tiên nếu không có tham số page
			}));
			searchParams.set("page", "1");
			setSearchParams(searchParams);
		}
		if (!searchParams.toString()) {
			setSearchParamsObject(() => {
				return {
					page: 1,
					limit: 9,
					search: "",
					category: "",
					colorId: [],
					sizeId: [],
					minPrice: 0,
					maxPrice: 5000000,
					sort: "createdAt",
					order: "desc",
				};
			});
		}
	}, [searchParams]);
	console.log("searchParamsObject ", searchParamsObject);

	const { data: products, isLoading } = useQuery({
		queryKey: ["Products", searchParamsObject],
		queryFn: () => getAllProduct(searchParamsObject as any),
		staleTime: 5 * 60 * 1000, // Giữ dữ liệu tươi trong 5 phút
		gcTime: 10 * 60 * 1000, // Giữ dữ liệu trong bộ nhớ tạm 10 phút
	});
	console.log("data", products);
	// const updateSearchParams = (newParams: any) => {
	// 	console.log("newParams", newParams);
	// 	const current = Object.fromEntries(searchParams.entries());
	// 	console.log("current", current);
	// 	setSearchParams({ ...current, ...newParams, page: 1 });
	// };
	const handlePageChange = (page: number) => {
		if (typeof page === "number" && !isNaN(page)) {
			setSearchParamsObject((prev) => ({
				...prev,
				page: page, // Sử dụng trực tiếp giá trị page
			}));
			searchParams.set("page", String(page));
			setSearchParams(searchParams);
		} else {
			console.error("Invalid page number:", page);
		}
	};

	const animationVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				delayChildren: 0.5,
				duration: 2,
			},
		},
	};
	return (
		<div className="padding">
			<div className="">
				<div className="flex justify-end gap-5 text-base font-medium ">
					<p className="flex items-center gap-1 cursor-pointer md:hidden">
						<IoFilter size={20} /> Bọ lọc
					</p>
					<p className="flex items-center gap-1">
						<GrSort />
						{/* <MdOutlineSort size={20} /> */}
						Sắp xếp
					</p>
				</div>
			</div>
			<div className="flex">
				<div className={cn("h-full max-w-[250px] w-[250px] space-y-6 ")}>
					<FilterByCategory setSearchParamsObject={setSearchParamsObject} />
					<FilterByPrice
						searchParamsObject={searchParamsObject}
						setSearchParamsObject={setSearchParamsObject}
					/>
					<FilterByColor setSearchParamsObject={setSearchParamsObject} />
					<FilterBySize setSearchParamsObject={setSearchParamsObject} />
				</div>
				<div className="px-6 lg:px-8 w-full h-full">
					{isLoading ? (
						<div className="">
							<Spin />
							loading...
						</div>
					) : (
						<div className="">
							{products?.data?.content.length === 0 && (
								<div className="max-w-[100%] w-full h-[500px] flex justify-center items-center">
									Không có sản phẩm
								</div>
							)}
							<div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
								{products?.data?.content?.map(
									(item: IProduct, index: number) => (
										<ProductItem product={item} key={index} />
									),
								)}
							</div>

							{products?.data?.content?.length > 0 && (
								<div className="mt-6 flex justify-center">
									<Pagination
										current={searchParamsObject.page}
										total={products?.data.totalAllOptions || 0}
										pageSize={searchParamsObject.limit}
										onChange={handlePageChange}
									/>
								</div>
							)}
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default ShopIndex;
