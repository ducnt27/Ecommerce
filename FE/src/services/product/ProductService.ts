import instance from "@/config/instance";
import { IProduct } from "@/interfaces/products";
import { ISearchObject, ISearchObjectProduct } from "@/interfaces/searchObject";

export const createProduct = (data: IProduct) => {
	const uri = `/products/create`;
	return instance.post(uri, data);
};
export const updateProduct = (id: string, data: IProduct) => {
	const uri = `/products/update/${id}`;
	return instance.put(uri, data);
};
export const pagingProduct = ({ page, pageSize, tab }: ISearchObject) => {
	const uri = `/products/pagingProducts`;
	const params = {
		page,
		pageSize,
		tab,
	};
	return instance.get(uri, { params });
};

export const getAllProduct = ({
	page,
	limit,
	tab,
	category,
	search,
	colorId,
	sizeId,
	sort,
	order,
}: ISearchObjectProduct) => {
	const uri = `/products/getAllProducts`;
	const params = {
		page,
		limit,
		tab,
		category,
		colorId,
		sizeId,
		search,
		sort,
		order,
	};
	return instance.get(uri, { params });
};
export const getProductById = (id: string) => {
	const uri = `/products/getById/${id}`;
	return instance.get(uri);
};
export const getProductDetail = (slug: string) => {
	const uri = `/products/getDetail/${slug}`;
	return instance.get(uri);
};
export const deleteProduct = (id: string) => {
	const uri = `/products/delete/${id}`;
	return instance.put(uri);
};

export const restoreProduct = (id: string) => {
	const uri = `/products/restore/${id}`;
	return instance.put(uri);
};
