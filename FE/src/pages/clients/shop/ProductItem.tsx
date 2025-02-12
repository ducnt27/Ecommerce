import { IProduct } from "@/interfaces/products";
import { cn } from "@/lib/utils";
import React from "react";
import { Link } from "react-router-dom";

interface Props {
	product: IProduct;
	key: number;
}
const ProductItem = ({ product, key }: Props) => {
	return (
		<div>
			<div className="">
				<Link to={`/detail/${product?.slug}`}>
					<div key={key}>
						<div className="relative h-[380px] bg-gray-300 ">
							<img
								src={product.image[0]}
								alt=""
								className="w-full h-full object-cover overflow-hidden "
							/>
							<div
								className={cn(
									product?.discountPercentage === 0
										? "hidden"
										: "w-10 h-10 bg-red-500 border border-transparent rounded-full absolute top-4 right-4 flex justify-center items-center text-white ",
								)}
							>
								{product?.discountPercentage}%
							</div>
						</div>
						<div className="flex justify-between items-center pt-2 pb-1 font-medium text-gray-500">
							<span>{product.uniqueColorCount} Màu sắc</span>
							<span>{product.uniqueSizeCount} Size</span>
						</div>
						<h3 className="text-base font-semibold text-orange-500">
							{product?.category.name}
						</h3>
						<h3 className="text-base font-semibold">{product.name}</h3>
						<div className="space-x-3">
							<span>{product.price}đ</span>
						</div>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default ProductItem;
