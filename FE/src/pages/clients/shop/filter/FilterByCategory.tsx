import { ICategory } from "@/interfaces/products";
import { ISearchObjectProduct } from "@/interfaces/searchObject";
import { cn } from "@/lib/utils";
import { getAllCate } from "@/services/product/CategoryService";
import { useQuery } from "@tanstack/react-query";
import { Collapse, CollapseProps } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

interface Prop {
	setSearchParamsObject: Dispatch<SetStateAction<ISearchObjectProduct>>;
}
const FilterByCategory = ({ setSearchParamsObject }: Prop) => {
	// const [categories, setCategories] = useState<ICategory[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const { data: categories } = useQuery({
		queryKey: ["Categories"],
		queryFn: async () => {
			return await getAllCate();
		},
		refetchOnWindowFocus: false,
		refetchInterval: 60000, // 1 minute
	});
	// const handleSearchCategory = (id: string) => {
	// 	searchParams.set("category", id);
	// 	searchParams.set("page", "1");
	// 	setSearchParams(searchParams);
	// 	const paramsObject: any = Object.fromEntries(searchParams.entries());
	// 	setSearchParamsObject((prev) => ({
	// 		...prev,
	// 		category: paramsObject.category,
	// 		page: 1,
	// 	}));
	// };
	const handleSearchCategory = (id: string) => {
		const payload = {
			category: id,
			page: "1",
		};

		// Check if category already exists in URL
		if (searchParams.get("category") === id) {
			searchParams.delete("category");
		} else {
			Object.entries(payload).forEach(([key, value]) => {
				searchParams.set(key, value);
			});
		}

		setSearchParams(searchParams);

		// Update search params object
		const paramsObject = Object.fromEntries(searchParams.entries());
		setSearchParamsObject((prev) => ({
			...prev,
			category: paramsObject.category || "", // Handle deleted category
			page: 1,
		}));
	};
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "Danh mục sản phẩm",
			children: (
				<div className="border-t-0">
					{categories?.data?.data.map((item: ICategory) => (
						<div
							key={item?._id}
							// className="relative max-w-40 max-h-[50px] overflow-hidden flex items-center font-thin border-[#e9e9e9] cursor-pointer py-2 gap-2 rounded   hover:underline has-[:checked]:underline has-[:checked]:font-bold"
							className=""
						>
							{/* <input
								type="radio"
								hidden
								checked={
									searchParams.get("category") === item._id ? true : false
								}
								id={item._id}
								value={item._id}
								className="absolute opacity"
								onChange={() => handleSearchCategory(item._id)}
							/> */}
							<button
								className={cn(
									`lg:text-base md:text-sm sm:text-xs `,
									searchParams.get("category") === item._id
										? "font-bold"
										: "font-normal",
								)}
								onClick={() => handleSearchCategory(item._id)}
							>
								{item.name}
							</button>
						</div>
					))}
				</div>
			),
		},
	];
	return (
		<div className="">
			<h3 className="text-md lg:text-xl font-medium uppercase pb-3">
				Danh mục{" "}
			</h3>
			{/* <Collapse
				items={items}
				// defaultActiveKey={["1"]}

				className="border-none bg-white "
			/> */}
			<div className="">
				{categories?.data?.data.map((item: ICategory) => (
					<div key={item?._id} className="border-t-0">
						<button
							className={cn(
								`lg:text-base md:text-sm sm:text-xs text-gray-500 line-clamp-1 text-left`,
								searchParams.get("category") === item._id
									? "font-bold"
									: "font-normal",
							)}
							onClick={() => handleSearchCategory(item._id)}
						>
							{item.name}
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default FilterByCategory;
