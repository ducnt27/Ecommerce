import React, { useState } from "react";
import { PoweroffOutlined, SyncOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import { MdOutlineAddShoppingCart } from "react-icons/md";

interface Props {
	title: string;
}
const LoadingButton: React.FC<Props> = ({ title }) => {
	const [loadings, setLoadings] = useState<boolean[]>([]);

	const enterLoading = (index: number) => {
		setLoadings((prevLoadings) => {
			const newLoadings = [...prevLoadings];
			newLoadings[index] = true;
			return newLoadings;
		});

		setTimeout(() => {
			setLoadings((prevLoadings) => {
				const newLoadings = [...prevLoadings];
				newLoadings[index] = false;
				return newLoadings;
			});
		}, 3000);
	};

	return (
		<Flex gap="small" vertical>
			<Flex gap="small" wrap>
				<Button
					type="primary"
					className="py-2"
					icon={<MdOutlineAddShoppingCart size={22} />}
					loading={loadings[3] && ({ icon: <SyncOutlined spin /> } as any)}
					onClick={() => enterLoading(3)}
				>
					{title}
				</Button>
			</Flex>
		</Flex>
	);
};

export default LoadingButton;
