import React, { useState } from "react";

interface Props {
	isLoading: boolean;
	image: string[];
	gallery: string[];
}
const AlbumProduct = ({ image, gallery, isLoading }: Props) => {
	const [mainImage, setMainImage] = useState<string | string[]>();
	const [activeIndex, setActiveIndex] = useState<number | null>(null);
	console.log("mainImage", mainImage);
	return (
		<div>
			<div className="">
				<div className="flex flex-col lg:flex-row gap-7 justify-center">
					<div className="order-2 lg:order-1 flex flex-1 flex-row lg:flex-col gap-7 justify-center">
						{gallery.map((img, index) => (
							<div
								key={index}
								className={`w-[20%] lg:w-full border border-gray-200 shadow-xl cursor-pointer transition-opacity duration-300 ${
									activeIndex === index ? "opacity-50" : "opacity-100"
								}`}
								onClick={() => {
									setMainImage(img);
									setActiveIndex(index);
								}}
							>
								<img
									src={img}
									alt={`Thumbnail ${index + 1}`}
									className="w-full h-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
								/>
							</div>
						))}
					</div>
					<div className="order-1 lg:order-2 w-[100%] lg:w-[85%] border-gray-200 overflow-hidden rounded-[6px] shadow-md">
						<img
							src={(mainImage || image[0]) as string}
							className="w-full h-full object-cover transition-opacity duration-300 ease-in-out"
							alt="Main"
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AlbumProduct;
