import { ISize } from "@/interfaces/products";
import { ISearchObjectProduct } from "@/interfaces/searchObject";
import { cn } from "@/lib/utils";
import { getAllSizes } from "@/services/product/SizeService";
import { Checkbox, Collapse, CollapseProps } from "antd";
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import { useSearchParams } from "react-router-dom";
interface Prop {
	setSearchParamsObject: Dispatch<SetStateAction<ISearchObjectProduct>>;
}
const FilterBySize = ({ setSearchParamsObject }: Prop) => {
	const [sizes, setSizes] = useState<ISize[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllSizes();
				setSizes(data?.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	const handleCheckedSize = useCallback(
		(size: string) => (checked: any) => {
			let sizes = searchParams.get("sizeId")?.split(",").filter(Boolean) ?? [];
			console.log("size", size);
			console.log("size", size);
			console.log("checked", checked.target.checked);

			if (checked.target.checked) {
				sizes.push(size);
			} else {
				sizes = sizes.filter((_size) => _size !== size);
			}
			if (sizes.length === 0) {
				searchParams.delete("sizeId");
			} else {
				searchParams.set("sizeId", sizes.join());
			}
			searchParams.set("page", "1");
			setSearchParams(searchParams);

			const paramsObject: any = Object.fromEntries(searchParams.entries());
			const sizeCheck =
				paramsObject?.sizeId
					?.split(",")
					.map((c: string) => c.trim())
					.filter(Boolean) ?? [];
			console.log("sizeId", paramsObject.sizeId);
			setSearchParamsObject((prev) => ({
				...prev,
				sizeId: sizeCheck,
				page: 1,
			}));
		},
		[searchParams, setSearchParams, setSearchParamsObject],
	);
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "Kích thước",
			children: (
				<div className="">
					<div className="grid grid-cols-3 gap-3">
						{sizes.map((item: ISize, index: number) => {
							return (
								<div className="">
									<Checkbox
										key={index}
										value={item._id}
										className={cn(
											// "custom-checkbox-1",
											"font-medium text-black ",
											"border border-gray-400 px-3 py-2 ",
											"bg-gray-300",
											"rounded-lg",
											"[&_.ant-checkbox]:hidden",
											searchParams
												.get("sizeId")
												?.split(",")
												.includes(item._id) &&
												"border-red-500 bg-red-500 text-white",
										)}
										onChange={handleCheckedSize(item._id)}
									>
										{item.name}
									</Checkbox>
								</div>
							);
						})}
					</div>
				</div>
			),
		},
	];
	return (
		<div>
			<Collapse items={items} defaultActiveKey={["1"]} />
		</div>
	);
};

export default FilterBySize;
