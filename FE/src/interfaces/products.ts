export interface ICategory {
	_id: string;
	name: string;
	slug: string;
	thumbnail: any;
	description: string;
	active: boolean;
	deleted: boolean;
}
export interface IProduct {
	_id: string;
	name: string;
	category: ICategory;
	slug: string;
	image: any;
	gallery: any;
	price: number;
	discount: number;
	quantity: number;
	description: string;
	deleted: boolean;
}
export interface ISearchObject {
	page: number;
	pageSize?: number;
	tab?: number;
}
