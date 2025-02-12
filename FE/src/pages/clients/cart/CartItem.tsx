import { ICart, ICartItem } from "@/interfaces/cart";
import { IListColorAttribute, IListSizeAttribute } from "@/interfaces/products";
interface CartItemProps {
	cart?: ICart;
	item: ICartItem;
	listSizeAndColor?: {
		listColor?: IListColorAttribute[];
		listSize?: IListSizeAttribute[];
	};
	attributeAlreadyExists?: {
		listColor?: string[];
		listSize?: string[];
	};
	productId: string;
	checked: boolean;
	onCheckedChange?: (productId: string, itemId: string) => void;
	checkAttribute?: boolean;
}
const CartItem = ({
	cart,
	item,
	productId,
	checked,
	listSizeAndColor,
	attributeAlreadyExists,
	onCheckedChange,
	checkAttribute,
}: CartItemProps) => {
	return <div>CartItem</div>;
};

export default CartItem;
