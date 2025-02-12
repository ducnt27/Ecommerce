import { pagingCart } from "@/services/CartService";
import useCart from "@/store/useCart";
import { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { CartGroup } from "./CartGroup";
import { cn } from "@/lib/utils";

const CartIndex = () => {
	const { carts, totalCart, itemCart, setItemCart, setTotalCart, setCarts } =
		useCart();
	const [isLoading, setIsLoading] = useState(false);
	useEffect(() => {
		(async () => {
			try {
				const { data } = await pagingCart();
				setCarts(data?.data);
			} catch (error) {
				console.error(error);
				if (error instanceof AxiosError) {
					toast.error(error?.response?.data?.message);
				}
			}
		})();
	}, []);
	console.log("carts", carts);
	return (
		<div>
			<div className="padding">
				<section className="px-0 sm:px-[30px] md:px-[40px] xl:px-[50px] 2xl:px-[60px] w-full  py-5">
					{carts?.length <= 0 && !isLoading ? (
						<div className="flex flex-col items-center justify-center gap-3 h-[21rem]">
							<div className="w-28">
								<img
									src="/cart-is-empty.png"
									alt=""
									className="w-full h-auto"
								/>
							</div>
							<p className="text-base font-semibold text-gray-500">
								Giỏ hàng của bạn còn trống
							</p>
							<Link
								to={"/shop"}
								className="px-10 py-2 text-white rounded bg-custom-500 hover:bg-custom-600"
							>
								Mua ngay
							</Link>
						</div>
					) : (
						<>
							<div className="header flex items-center bg-white rounded shadow-sm text-gray-400 text-sm h-14 mb-3 overflow-hidden px-2.5 md:px-5">
								<div className="flex md:flex-row-reverse min-w-9 md:min-w-[58px] md:pl-5 pr-3">
									{/* <Checkbox
										checked={allChecked}
										onCheckedChange={handleCheckAll}
										className="data-[state=checked]:bg-custom-500 border-gray-300 data-[state=checked]:border-red-500"
									/> */}
								</div>
								<div className="w-full md:w-[46.27949%]">Sản phẩm</div>
								<div className="w-[15.88022%] text-center hidden lg:block">
									Đơn giá
								</div>
								<div className="w-[15.4265%] text-center hidden lg:block">
									Số lượng
								</div>
								<div className="w-[10.43557%] text-center hidden lg:block">
									Số tiền
								</div>
								<div className="w-[12.70417%] text-end md:text-center block">
									<span className="hidden md:inline-block">Thao tác</span>
									{/* <div
										className="flex items-center justify-end p-1 cursor-pointer md:hidden"
										onClick={() => {
											const listId = getAllSelectedItems() as string[];
											listId?.length <= 0
												? toast.error(
														"Bạn chưa chọn sản phẩm nào trong giỏ hàng để xoá!",
													)
												: setIsModalConfirm(true);
										}}
									>
										<HiOutlineTrash size={20} />
									</div> */}
								</div>
							</div>
							<>
								{carts?.map((cart) => (
									<CartGroup
										key={cart.product._id}
										cart={cart}
										// groupChecked={groupCheckedState[cart.product._id as string]}
										// onGroupCheckedChange={handleCheckboxGroup}
										// onItemCheckedChange={handleCheckboxItem}
										// checkedState={checkedState}
									/>
								))}
								{/* <div className="sticky bottom-0 bg-white shadow-[0px_-3px_5px_#0000000f] py-5 w-full">
								
									<div className="flex items-center justify-between w-full px-2 mt-5 md:px-6">
										<div className="flex items-center gap-10 px-2 md:px-6">
											<div className="flex items-center gap-5 text-sm">
												<Checkbox
													id="checkedAllFotter"
													checked={allChecked}
													onCheckedChange={handleCheckAll}
													className="data-[state=checked]:bg-custom-500 border-gray-300 data-[state=checked]:border-red-500"
												/>
												<label
													htmlFor="checkedAllFotter"
													className="text-base whitespace-nowrap md:hidden"
												>
													Tất cả
												</label>
												<label
													htmlFor="checkedAllFotter"
													className="hidden text-base whitespace-nowrap md:inline-block"
												>
													Chọn tất cả ({totalAttribute})
												</label>
											</div>
											<div
												className="hidden cursor-pointer md:block"
												onClick={() => {
													const listId = getAllSelectedItems() as string[];
													listId?.length <= 0
														? toast.error(
																"Bạn chưa chọn sản phẩm nào trong giỏ hàng để xoá!",
															)
														: setIsModalConfirm(true);
												}}
											>
												Xoá
											</div>
										</div>
										<div className="flex flex-col items-end justify-end gap-3 md:items-center md:gap-5 md:flex-row ">
											<div className="flex items-center justify-end">
												<p className="text-xs md:text-lg text-start md:text-end">
													Tổng thanh toán{" "}
													<span className="hidden md:inline-block">
														({totalSelectedAmount.totalQuantity} sản phẩm)
													</span>
													:{" "}
													<span className="font-medium text-red-500 md:text-lg">
														{formatCurrency(
															(discountCode?.currentVoucherCode as any)
																?.valueAmount ||
																totalSelectedAmount.totalAmount,
														)}
													</span>
												</p>
											</div>
											<Button
												onClick={handleSubmitted}
												className="text-xs sm:text-sm md:text-base md:h-12  w-32 md:w-[320px] bg-custom-500 hover:bg-custom-600"
											>
												Mua hàng{" "}
												<span className="inline-block md:hidden">
													({totalSelectedAmount?.totalQuantity})
												</span>
											</Button>
										</div>
									</div>
								</div> */}
							</>
						</>
					)}
				</section>
			</div>
		</div>
	);
};

export default CartIndex;
