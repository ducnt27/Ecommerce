import { IProductDetail } from "@/interfaces/products";
import { useCallback, useEffect, useMemo, useState } from "react";
import ListColor from "./ListColor";
import ListSize from "./ListSize";
import { formatCurrency } from "@/common/func/formatFuc";
import InputQuantity from "@/components/common/InputQuantity";
import LoadingButton from "@/components/common/LoadingButton";
import { useAuth } from "@/hooks/auth";
import { useNavigate } from "react-router-dom";
import useCart from "@/store/useCart";
import { useCurrentRouteAndNavigation } from "@/hooks/router";
import { toast } from "sonner";
import { addProductToCart, pagingCart } from "@/services/CartService";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";

interface Props {
	product: IProductDetail;
	isLoading?: boolean;
}
interface IStateAttributes {
	listColorExist: {
		id: string;
		colorCode: string;
		colorName: string;
		listSize: string[];
	}[];
	listSizeExist: {
		id: string;
		sizeName: string;
		listColor: string[];
	}[];
}
const ProductInformation = ({ product }: Props) => {
	const { isLoggedIn } = useAuth();
	console.log("isLoggedIn", isLoggedIn);
	const navigate = useNavigate();
	const navigateIsLogin = useCurrentRouteAndNavigation();
	const { updateTotalCart, setCarts } = useCart();
	const [stateAttributes, setStateAttributes] = useState<IStateAttributes>({
		listColorExist: [],
		listSizeExist: [],
	});
	const [exitsListSize, setExitsListSize] = useState<string[]>([]);
	const [exitsListColor, setExitsListColor] = useState<string[]>([]);
	const [chooseColorId, setChooseColorId] = useState("");
	const [chooseSizeId, setChooseSizeId] = useState("");
	const [attributeId, setAttributeId] = useState("");
	const [price, setPrice] = useState({
		origin: product?.price,
		discount: product?.discount,
	});
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [purchaseQuantity, setPurchaseQuantity] = useState(1);

	console.log("total quantity", totalQuantity);
	const [isErrorAttribute, setIsErrorAttribute] = useState<boolean>(false);

	useMemo(() => {
		const updateQuantityAndAttributes = () => {
			if (chooseColorId && chooseSizeId) {
				const currentAttribute = product?.attribute?.find(
					(attribute) =>
						attribute?.colorId?._id === chooseColorId &&
						attribute?.sizeId?._id === chooseSizeId,
				);
				console.log("current attribute: ", currentAttribute);
				setPrice({
					origin: currentAttribute?.price,
					discount: currentAttribute?.discount,
				});
				setIsErrorAttribute(false);
				setAttributeId(currentAttribute?._id || "");
				setTotalQuantity(currentAttribute?.quantity as number);
			} else if (chooseSizeId) {
				const quantity = product?.listSize?.find(
					(size) => size?.sizeId === chooseSizeId,
				)?.quantity;
				setPrice({
					origin: product?.price as number,
					discount: product?.discount as number,
				});
				setAttributeId("");
				setTotalQuantity(quantity as number);
			} else if (chooseColorId) {
				const quantity = product?.listColor?.find(
					(color) => color?.colorId === chooseColorId,
				)?.quantity;
				setPrice({
					origin: product?.price as number,
					discount: product?.discount as number,
				});
				setTotalQuantity(quantity as number);
				setAttributeId("");
			} else {
				setPrice({
					origin: product?.price as number,
					discount: product?.discount as number,
				});
				setAttributeId("");
				setTotalQuantity(product?.quantity as number);
				// setIsErrorAttribute(true);
			}
		};
		updateQuantityAndAttributes();
	}, [chooseColorId, chooseSizeId, product]);
	const handleStateAttribute = useCallback(() => {
		if (!product) return { listColorExist: [], listSizeExist: [] };

		const listColorExist =
			product?.listColor?.map((color) => ({
				id: color.colorId,
				colorCode: color.colorCode,
				colorName: color.colorName,
				listSize: color.list
					?.map((item) => item?.sizeId?._id)
					.filter(Boolean) as string[],
			})) || [];
		console.log("listColorExist", listColorExist);
		const listSizeExist =
			product?.listSize?.map((size) => ({
				id: size.sizeId,
				sizeName: size.sizeName,
				listColor: size.list
					?.map((item) => item?.colorId?._id)
					.filter(Boolean) as string[],
			})) || [];
		return { listColorExist, listSizeExist };
	}, [product]);
	useEffect(() => {
		setStateAttributes(handleStateAttribute());
		setTotalQuantity(product?.quantity || 0);
	}, [product, handleStateAttribute]);

	const handleOrderProduct = async (action: "addToCart" | "buyNow") => {
		if (isLoggedIn === false) {
			return navigateIsLogin();
			// navigate("/auth/login");
		}
		if (!attributeId) {
			setIsErrorAttribute(true);
			return;
		}
		const isOutOfStock = (quantity: number) => quantity <= 0;
		const currentProductAttribute = product?.attribute?.find(
			(attribute) => attribute._id === attributeId,
		);

		if (
			attributeId &&
			isOutOfStock(currentProductAttribute?.quantity as number)
		) {
			toast.error("Sản phẩm này tạm thời hết hàng");
			return;
		}
		switch (action) {
			case "addToCart":
				try {
					await addProductToCart({
						attribute: attributeId || null,
						quantity: purchaseQuantity,
						productId: product._id as string,
					});
					const { data: dataCart } = await pagingCart();
					setCarts(dataCart);
					updateTotalCart(purchaseQuantity);
				} catch (error) {
					if (error instanceof AxiosError) {
						toast.error(error?.response?.data?.message);
					}
				}
		}
	};
	return (
		<>
			<div className="">
				<p className=" text-xs md:text-sm  text-[#D33918]">
					{product?.brand?.name} - <span>{product?.category?.name}</span>
				</p>
				<h2 className="pb-2 w-full text-xl font-medium uppercase text-wrap">
					{product?.name}
				</h2>
				<div className="flex items-center gap-x-3">
					<p className=" text-lg md:text-2xl text-red-500 font-medium ">
						{formatCurrency((price?.origin || 0) - (price?.discount || 0))}
					</p>
					<p className="text-base md:text-lg text-gray-500 line-through">
						{formatCurrency(price?.origin || 0)}
					</p>
					<p className="text-[#007D48] font-medium">
						Giảm {product?.discountPercentage}%
					</p>
				</div>
			</div>
			<div className="pt-8 space-y-5">
				<ListColor
					listColorExist={stateAttributes?.listColorExist}
					onChoose={setChooseColorId}
					setExitsListSize={setExitsListSize}
					exitsListColor={exitsListColor}
					setTotalQuantity={setTotalQuantity}
				/>
				<ListSize
					listSizeExist={stateAttributes?.listSizeExist}
					onChoose={setChooseSizeId}
					exitsListSize={exitsListSize}
					setExitsListColor={setExitsListColor}
					setTotalQuantity={setTotalQuantity}
				/>
			</div>
			<div className="py-5 flex items-start max-md:flex-col max-md:gap-3 md:items-center">
				<h3 className="text-base font-normal text-gray-500 min-w-28 max-w-28">
					Số lượng
				</h3>
				<div className="flex items-center gap-3">
					<InputQuantity
						disabled={totalQuantity <= 0}
						defaultValue={1}
						maxTotal={totalQuantity}
						getValue={setPurchaseQuantity}
						className="bg-white"
						size="responsive"
					/>
					{/* {totalQuantity > 0 ? (
						<span className="text-sm text-gray-600 md:text-base">
							{totalQuantity} sản phẩm có sẵn
						</span>
					) : (
						<span className="text-sm text-red-500 md:text-base">*Hết hàng</span>
					)} */}
				</div>
			</div>
			<span
				className={cn(
					"text-red-500 hidden",
					isErrorAttribute && "inline-block",
				)}
			>
				Vui lòng chọn phân loại hàng
			</span>
			<div className="flex gap-x-5 mt-3">
				<button className="px-6 py-3 border rounded-[4px] bg-[#111111] text-white hover:opacity-70 duration-300">
					Mua ngay
				</button>
				<button
					onClick={() => handleOrderProduct("addToCart")}
					className="px-6 py-3 border border-[#111111] rounded-[4px]  bg-gray-100 hover:bg-[#111111]/30
				 hover:border-[#111111]/20 hover:text-white duration-300"
				>
					Thêm vào giỏ hàng
				</button>
				{/* <LoadingButton title="Thêm vào giỏ hàng" /> */}
			</div>
		</>
	);
};

export default ProductInformation;
