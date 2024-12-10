import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const upLoadFiles = async (
	files: { dataURL: string; file: File }[] | File,
) => {
	if (files) {
		const CLOUND_NAME = process.env.CLOUND_NAME;
		const PRESET_NAME = process.env.PRESET_NAME;
		const FOLDER_NAME = process.env.FOLDER_NAME;

		const api = `https://api.cloudinary.com/v1_1/${CLOUND_NAME}/image/upload`;
		const uploadSingleFile = async (file: File) => {
			const formData = new FormData();
			formData.append("upload_preset", PRESET_NAME as string);
			formData.append("folder", FOLDER_NAME as string);
			formData.append("file", file);
			const { data } = await axios.post(api, formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});
			return data.url;
		};
		if (files instanceof File) {
			return uploadSingleFile(files);
		} else {
			const urls: string[] = [];
			for (const fileObj of files) {
				const url = await uploadSingleFile(fileObj.file);
				urls.push(url);
			}
			return urls;
		}
	}
};
// const upLoadFiles = async (files: { dataURL: string; file: File }[] | File) => {
// 	if (files) {
// 		const api = `https://api.cloudinary.com/v1_1/${process.env.CLOUND_NAME}/image/upload`;
// 		const uploadSingleFile = async (file: File) => {
// 			const formData = new FormData();
// 			formData.append("upload_preset", process.env.PRESET_NAME as string);
// 			formData.append("folder", process.env.FOLDER_NAME as string);
// 			formData.append("file", file);
// 			const { data } = await axios.post(api, formData, {
// 				headers: { "Content-Type": "multipart/form-data" },
// 			});
// 			return data.url;
// 		};
// 		if (files instanceof File) {
// 			return uploadSingleFile(files);
// 		} else {
// 			const urls: string[] = [];
// 			for (const fileObj of files) {
// 				const url = await uploadSingleFile(fileObj.file);
// 				urls.push(url);
// 			}
// 			return urls;
// 		}
// 	}
// };
// export { upLoadFiles };

export const uploadSingleImage = async (file: File): Promise<string | null> => {
	try {
		const formData = new FormData();
		formData.append("file", file);
		formData.append("upload_preset", process.env.PRESET_NAME || "");

		const response = await axios.post(
			`https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`,
			formData,
		);

		// Trả về URL của ảnh đã upload
		return response.data.secure_url;
	} catch (error) {
		console.error("Error uploading image:", error);
		return null;
	}
};
