import { getProductDetail } from "@/services/product/ProductService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import AlbumProduct from "./ProductAlbum";
import ProductInformation from "./ProductInfor";
import ProductDescription from "./ProductDescription";

const ProductDetailPage = () => {
	const { slug } = useParams();
	const { data, isLoading } = useQuery({
		queryKey: ["PRODUCT_DETAIL", slug],
		queryFn: async () => {
			const { data } = await getProductDetail(slug as string);
			return data.data;
		},
		refetchOnWindowFocus: false,
		refetchInterval: 60000, // 1 minute
	});
	console.log("data", data);
	// console.log("type image", data?.product?.image);
	if (isLoading) return <div>Loading....</div>;
	return (
		<div className="padding">
			<div className=""></div>
			{/* product  */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-y-20  gap-x-16">
				<div className="">
					<AlbumProduct
						image={data?.image}
						gallery={data?.gallery}
						isLoading={isLoading}
					/>
				</div>
				<div className="">
					<ProductInformation product={data} isLoading={isLoading} />
				</div>
			</div>
			<div className="">
				<div className="">
					<ProductDescription description={data?.description} />
				</div>
			</div>
		</div>
	);
};

export default ProductDetailPage;
