import instance from "@/config/instance";
import { ISize } from "@/interfaces/products";
import { ISearchObject } from "@/interfaces/searchObject";

// export const paginateSize = (options: ISearchObject) => {
// 	const uri = `/size/paginate`;
// 	return instance.get(uri, options);
// };
export const paginateSize = ({ page, pageSize, tab }: ISearchObject) => {
	const uri = "/size/paginate"; // Endpoint chính cho danh mục
	const params = {
		page,
		pageSize,
		tab,
	};
	// Gửi request với tham số query
	return instance.get(uri, { params });
};
export const addSize = (data: ISize) => {
	const uri = `/size/create`;
	return instance.post(uri, data);
};
export const updateSize = (id: string, data: ISize) => {
	const uri = `/size/update/${id}`;
	return instance.put(uri, data);
};
export const hiddenSize = (id: string | boolean) => {
	const uri = `/size/delSort/${id}`;
	return instance.delete(uri);
};
export const getAllSizes = () => {
	const uri = `/size/getAll`;
	return instance.get(uri);
};
export const getSizeById = (id: string) => {
	const uri = `/size/findById/${id}`;
	return instance.get(uri);
};
export const deleteSize = (id: string) => {
	const uri = `/size/delete/${id}`;
	return instance.put(uri);
};
export const restoreSizeById = (id: string) => {
	const uri = `/size/restore/${id}`;
	return instance.put(uri);
};
