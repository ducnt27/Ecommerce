import instance from "@/config/instance";
import { IAddToCart } from "@/interfaces/cart";

export const pagingCart = () => {
	const uri = `/cart/pagingCart`;
	return instance.get(uri);
};
export const addProductToCart = (payload: IAddToCart) => {
	const uri = `/cart/addToCart`;
	return instance.post(uri, payload);
};
export const updateCartItem = (
	id: string,
	payload: { quantity?: number; attribute?: string },
) => {
	const uri = `/cart/updateCart/${id}`;
	return instance.put(uri, payload);
};
