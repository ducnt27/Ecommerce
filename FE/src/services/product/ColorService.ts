import instance from "@/config/instance";
import { IColor } from "@/interfaces/products";

// export const getPaginate = (options: OptionsType) => {
// 	const uri = `/color/paginate`;
// 	return instance.post(uri, options);
// };
export const addColor = (data: IColor) => {
	const uri = `/color/create`;
	return instance.post(uri, data);
};
export const updateColor = (id: string, data: IColor) => {
	const uri = `/color/update/${id}`;
	return instance.put(uri, data);
};
export const hiddenColor = (id: string | boolean) => {
	const uri = `/color/delSort/${id}`;
	return instance.delete(uri);
};
export const getAllColors = () => {
	const uri = `color/getAll`;
	return instance.get(uri);
};
export const getColorById = (id: string) => {
	const uri = `/color/findById/${id}`;
	return instance.get(uri);
};
export const deleteColor = (id: string) => {
	const uri = `/color/delete/${id}`;
	return instance.put(uri);
};
export const restoreColor = (id: string) => {
	const uri = `/color/restore/${id}`;
	return instance.put(uri);
};
