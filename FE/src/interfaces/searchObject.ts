export interface ISearchObject {
	page: number;
	limit?: number;
	pageSize?: number;
	tab?: number;
	sort?: string;
	order?: string;
	search?: string;
}
export interface ISearchObjectProduct extends ISearchObject {
	minPrice?: number | null;
	maxPrice?: number | null;
	category?: string | null;
	colorId?: string[];
	sizeId?: string[];
}
