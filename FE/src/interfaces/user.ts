export interface IFormUser {
	_id: string;
	full_name?: string;
	email: string;
	password: string;
	confirmPassword?: string;
}
export interface IUser {
	_id?: string;
	email?: string;
	avatarUrl?: string;
	full_name: string;
	createdAt?: string;
	is_admin?: boolean;
	updatedAt?: string;
}
