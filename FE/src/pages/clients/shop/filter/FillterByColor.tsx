import { IColor } from "@/interfaces/products";
import { ISearchObjectProduct } from "@/interfaces/searchObject";
import { cn } from "@/lib/utils";
import { getAllColors } from "@/services/product/ColorService";
import { useQueryClient } from "@tanstack/react-query";
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
const FilterByColor = ({ setSearchParamsObject }: Prop) => {
	const [colors, setColors] = useState<IColor[]>([]);
	const [searchParams, setSearchParams] = useSearchParams();
	useEffect(() => {
		(async () => {
			try {
				const { data } = await getAllColors();
				setColors(data?.data);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	const handleCheckedColor = useCallback(
		(color: string) => (checked: any) => {
			let colors =
				searchParams.get("colorId")?.split(",").filter(Boolean) ?? [];
			console.log("colors", colors.length);
			// console.log("color", color);
			// console.log("checked", checked.target.checked);

			if (checked.target.checked) {
				colors.push(color);
			} else {
				colors = colors.filter((_color) => _color !== color);
			}
			if (colors.length === 0) {
				searchParams.delete("colorId");
			} else {
				searchParams.set("colorId", colors.join());
			}
			searchParams.set("page", "1");
			setSearchParams(searchParams);

			const paramsObject: any = Object.fromEntries(searchParams.entries());
			const colorCheck =
				paramsObject?.colorId
					?.split(",")
					.map((c: string) => c.trim())
					.filter(Boolean) ?? [];
			console.log("colorCheck", paramsObject.colorId);
			setSearchParamsObject((prev) => ({
				...prev,
				colorId: colorCheck,
				page: 1,
			}));
		},
		[searchParams, setSearchParams, setSearchParamsObject],
	);
	const items: CollapseProps["items"] = [
		{
			key: "1",
			label: "Màu sắc",
			children: (
				<div className="">
					<div className="grid grid-cols-4 gap-4">
						{colors.map((item: IColor, index: number) => {
							return (
								<div className="custom-checkbox-wrapper ">
									<Checkbox
										key={index}
										value={item._id}
										className={cn(
											"custom-checkbox",
											"border border-gray-200",
											"bg-transparent",
											"rounded-full",
											item.code === "#ffffff" && `tick-black`,
										)}
										style={{
											backgroundColor: item.code,
										}}
										onChange={handleCheckedColor(item._id)}
										checked={searchParams
											.get("colorId")
											?.split(",")
											.includes(item._id)}
									></Checkbox>
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
			<Collapse
				items={items}
				defaultActiveKey={["1"]}
				className="border-none bg-white"
			/>
		</div>
	);
};

export default FilterByColor;
