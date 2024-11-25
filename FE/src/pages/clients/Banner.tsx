import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
// import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import ButtonComponent from "@/components/ButtonComponent";
// import "./styles.css";
const Banner = () => {
	return (
		<div className="padding relative font-fontG xl:h-[860px] lg:h-[800px] md:h-[580px] sm:h-[500px] h-[550px] max-[420px]:h-[550px] w-full bg-gradient-to-r from-[#D9C7FB] to-[#E7DBFF]">
			{/* Box loang màu tím ở nửa trên bên trái */}
			<div className="absolute z-10 top-6 left-0 md:w-[450px] md:h-[450px] rounded-full bg-[#C6ACF3] blur-3xl"></div>

			{/* Box loang màu tím ở giữa phía dưới */}
			<div className="absolute z-10 -bottom-6 left-1/3 transform -translate-x-1/2 md:w-[450px] md:h-[450px] rounded-full bg-[#C6ACF3] opacity-70 blur-3xl"></div>

			{/* Nội dung trang */}
			<div className="relative h-full pt-20 z-20 ">
				{/* Phần tiêu đề */}
				<div className="w-full m py-4 flex flex-row justify-between items-center md:flex-col md:items-start  mx-auto  lg:absolute  lg:t op-48">
					<h1 className="text-[#172E4E] text-[20px] md:text-[40px] lg:text-[48px] text-left font-bold">
						Bộ Sưu Tập Cao Cấp Mới Nhất
					</h1>
					<p className="text-lg break-all text-[#172E4E] font-medium hidden lg:block">
						Khám phá bộ sưu tập mới nhất của chúng tôi – sự kết hợp hoàn hảo
						giữa phong cách thời thượng và chất lượng đỉnh cao. Những thiết kế
						độc đáo, sang trọng, giúp bạn tỏa sáng trong mọi dịp
					</p>
					<div className="lg:mt-6 hidden md:block ">
						<ButtonComponent
							title="Xem ngay"
							className="px-3 py-2 lg:px-6 lg:py-[10px] text-sm md:text-base rounded-md"
						/>
					</div>
				</div>

				{/* Phần hình ảnh */}
				<div className="  w-full">
					{/* Dành cho màn hình lớn hơn md */}
					<div className="hidden md:flex justify-end gap-5  lg:gap-8">
						<div className="md:h-[250px] max-w-[220px] lg:h-[280px] lg:mt-[300px]">
							<img
								src="/img1.png"
								className="w-full object-cover h-full"
								alt="Image 1"
							/>
						</div>
						<div className="lg:mt-28 max-w-[220px] lg:h-[300px]">
							<img
								src="/img2.png"
								className="w-full object-cover h-full"
								alt="Image 2"
							/>
						</div>
						<div className="lg:h-[300px] max-w-[220px]">
							<img
								src="/img3.png"
								className="w-full object-cover h-full"
								alt="Image 3"
							/>
						</div>
					</div>

					{/* Swiper dành cho màn hình nhỏ hơn md */}
					<div className="md:hidden   ">
						<>
							<Swiper
								pagination={{ clickable: true }}
								navigation={true}
								autoplay={{
									delay: 2000,
									disableOnInteraction: false,
								}}
								modules={[Pagination, Autoplay]}
								className="mySwiper w-full flex justify-center"
							>
								<SwiperSlide className="">
									<img
										src="/img1.png"
										className="w-full border border-transparent rounded-xl overflow-hidden  object-cover  object-top max-[700px]:h-[500px] sm:h-[300px]"
										alt="Image 1"
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src="/img2.png"
										className="w-full border border-transparent rounded-xl overflow-hidden object-cover h-[300px]"
										alt="Image 2"
									/>
								</SwiperSlide>
								<SwiperSlide>
									<img
										src="/img3.png"
										className="w-full border border-transparent rounded-xl overflow-hidden object-cover h-[300px]"
										alt="Image 3"
									/>
								</SwiperSlide>
							</Swiper>
						</>
					</div>
				</div>

				{/* Các box nhỏ */}
				<div className="mt-5 lg:absolute bottom-20 left-10">
					<div className="w-full  flex justify-center items-center space-x-8">
						<div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-300 shadow-lg"></div>
						<div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-300 shadow-lg"></div>
						<div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-300 shadow-lg"></div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
