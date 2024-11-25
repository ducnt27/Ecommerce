import instance from "@/config/instance";
import { IFormUser, IUser } from "@/interfaces/user";

export const signup = (data: IFormUser) => {
	const uri = `/auth/register`;
	return instance.post(uri, data);
};
export const signin = (data: IFormUser) => {
	const uri = `/auth/login`;
	return instance.post(uri, data);
};
export const currentUser = () => {
	const uri = `/auth/currentUser`;
	return instance.get(uri);
};
export const socialUser = (data: any) => {
	const uri = `/auth/socialUser`;
	return instance.post(uri, data);
};
export const logout = () => {
	const uri = `/auth/logout`;
	return instance.post(uri);
};
