import instance from "@/config/instance";
import { IProduct, ISearchObject } from "@/interfaces/products";

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
export const getProductById = (id: string) => {
	const uri = `/products/getById/${id}`;
	return instance.get(uri);
};
export const getProductBySlug = (slug: string) => {};
export const deleteProduct = (id: string) => {
	const uri = `/products/delete/${id}`;
	return instance.put(uri);
};

export const restoreProduct = (id: string) => {
	const uri = `/products/restore/${id}`;
	return instance.put(uri);
};
