import instance from "@/config/instance";

export interface ICategory {
	_id: string;
	name: string;
	slug: string;
	thumbnail: any;
	description: string;
	active: boolean;
	deleted: boolean;
}
export interface ISearchObject {
	page: number;
	pageSize: number;
	tab?: number;
}
export const addCategory = (data: ICategory) => {
	const uri = `/category/createCategory`;
	return instance.post(uri, data);
};
export const updateCategory = (id: string, data: ICategory) => {
	const uri = `/category/updateCategory/${id}`;
	return instance.put(uri, data);
};
export const getAll = ({ page, pageSize, tab }: ISearchObject) => {
	const uri = "/category/getAll"; // Endpoint chính cho danh mục
	// Truyền các tham số dưới dạng query parameters trong URL
	const params = {
		page,
		pageSize,
		tab, // tab có thể là 1 (danh mục hiện tại) hoặc -1 (danh mục bị ẩn)
	};
	// Gửi request với tham số query
	return instance.get(uri, { params });
};
export const getCategoryById = (id: string) => {
	const uri = `/category/getCategoryById/${id}`;
	return instance.get(uri);
};
export const deleteCategoryById = (id: string) => {
	const uri = `/category/delete/${id}`;
	return instance.put(uri);
};
export const restoreCategoryById = (id: string) => {
	const uri = `/category/restore/${id}`;
	return instance.put(uri);
};
