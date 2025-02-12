import { ISearchObjectProduct } from "@/interfaces/searchObject";
import { Slider } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounceValue } from "usehooks-ts";
interface Prop {
	searchParamsObject: ISearchObjectProduct;
	setSearchParamsObject: Dispatch<SetStateAction<ISearchObjectProduct>>;
}
const FilterByPrice = ({ searchParamsObject, setSearchParamsObject }: Prop) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [values, setValues] = useState([
		(searchParamsObject.minPrice as number) || 0,
		(searchParamsObject.maxPrice as number) || 5000000,
	]);
	const [debouncedValues] = useDebounceValue(values, 1000);
	const handleChangePrice = (value: number[]) => {
		setValues(values);
	};
	return (
		<div>
			<h3 className="">Giá</h3>
			<div className="px-6">
				<Slider
					range
					value={debouncedValues}
					step={1000}
					min={0}
					max={5000000}
					onChange={handleChangePrice}
					marks={{
						0: "0",
						5000000: "5,000,000",
					}}
					// formatter={(value: number | number[]) =>
					// 	`${value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
					// }
				/>
			</div>
		</div>
	);
};

export default FilterByPrice;
