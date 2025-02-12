import { Attributes } from "react";

export interface ICategory {
	_id: string;
	name: string;
	slug: string;
	thumbnail: any;
	active: boolean;
	deleted: boolean;
}
export interface IBrand {
	_id: string;
	name: string;
	slug: string;
	thumbnail: any;
	active: boolean;
	deleted: boolean;
}
export interface IProduct {
	_id: string;
	name: string;
	category: ICategory;
	brand: IBrand;
	slug: string;
	image: string[];
	gallery: string[];
	price: number;
	discount: number;
	quantity: number;
	discountPercentage: number;
	description?: string;
	isDiscounted?: boolean;
	deleted: boolean;
	attribute: IAttribute[];
	featured: boolean;
	search?: string;
	uniqueColorCount: number;
	uniqueSizeCount: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface IColor {
	_id: string;
	name: string;
	code: string;
	deleted?: boolean;
	deletedAt?: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface ISize {
	_id: string;
	name: string;
	deleted?: boolean;
	deletedAt?: string;
	createdAt?: string;
	updatedAt?: string;
}
export interface IAttribute {
	_id?: string;
	colorId: IColor;
	sizeId: ISize;
	price: number;
	discount: number;
	quantity: number;
	deleted?: boolean;
	deletedAt?: string;
	createdAt?: string;
}

// product detail
export interface IListColorAttribute {
	colorId: string;
	colorName: string;
	quantity: number;
	colorCode: string;
	list: IAttribute[];
}
export interface IListSizeAttribute {
	sizeId: string;
	sizeName: string;
	quantity: number;
	list: IAttribute[];
}
export interface IProductDetail {
	_id?: string;
	name?: string;
	image: string[];
	gallery: string[];
	category?: {
		_id: string;
		name: string;
	};
	brand: IBrand;
	price?: number;
	discount?: number;
	discountPercentage?: number;
	description?: string;
	quantitySold: number;
	quantity: number;
	featured: boolean;
	deleted: boolean;
	attribute: IAttribute[];
	createdAt?: string;
	updatedAt?: string;
	slug?: string;
	listColor?: IListColorAttribute[];
	listSize?: IListSizeAttribute[];
}
