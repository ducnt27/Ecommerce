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
		} // Nếu files là một mảng các file
		try {
			// Sử dụng Promise.all để upload tất cả các file cùng lúc
			const uploadPromises = files.map((fileObj) =>
				uploadSingleFile(fileObj.file),
			);
			const urls = await Promise.all(uploadPromises);
			return urls;
		} catch (error) {
			console.error("Error uploading files:", error);
			throw new Error("Failed to upload files");
		}
	}
};
