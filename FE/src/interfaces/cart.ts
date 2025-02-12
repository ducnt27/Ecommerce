import { IAttribute, IColor, IProduct, ISize } from "./products";
export interface ICartItem {
	_id?: string;
	name: string;
	price: number;
	discount: number;
	image: string;
	attribute: IAttribute;
	quantity?: number;
	quantitySold?: number;
	totalQuantity: number;
}
export interface ICart {
	product: IProduct;
	quantity: number;
	attribute: IAttribute[];
	items: ICartItem[];
	listColor: [
		{
			colorId: string;
			colorName: string;
			list: [IAttribute];
			quantity: number;
			colorCode: string;
		},
	];
	listSize: [
		{
			sizeId: string;
			sizeName: string;
			list: [IAttribute];
			quantity: number;
		},
	];
}
export interface IAddToCart {
	productId: string;
	quantity: number;
	attribute: string | null;
}
export interface ICartPreview {
	_id: string;
	product: { _id: string; name: string; price: number; thumbnail: string };
	quantity: number;
	cart: string;
	attribute: {
		_id: string;
		color: IColor;
		size: ISize;
		price: number;
		quantity: number;
		discount: number;
		createdAt: Date;
		updatedAt: Date;
		__v: number;
	};
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}
export interface ICartStore {
	cart: ICart[] | [];
}
