import instance from "@/config/instance";
import { IBrand, ICategory } from "@/interfaces/products";
import { ISearchObject } from "@/interfaces/searchObject";

export const addBrand = (data: IBrand) => {
	const uri = `/brand/create`;
	return instance.post(uri, data);
};
export const updateBrand = (id: string, data: IBrand) => {
	const uri = `/brand/update/${id}`;
	return instance.put(uri, data);
};
export const getAllBrand = () => {
	const uri = `/brand/get`;
	return instance.get(uri);
};
export const pagingBrand = ({ page, pageSize, tab }: ISearchObject) => {
	const uri = "/brand/paging"; // Endpoint chính cho danh mục
	// Truyền các tham số dưới dạng query parameters trong URL
	const params = {
		page,
		pageSize,
		tab, // tab có thể là 1 (danh mục hiện tại) hoặc -1 (danh mục bị ẩn)
	};
	// Gửi request với tham số query
	return instance.get(uri, { params });
};
export const getBrandById = (id: string) => {
	const uri = `/brand/get/${id}`;
	return instance.get(uri);
};
export const deleteBrandById = (id: string) => {
	const uri = `/brand/delete/${id}`;
	return instance.put(uri);
};
export const restoreBrandById = (id: string) => {
	const uri = `/brand/restore/${id}`;
	return instance.put(uri);
};
