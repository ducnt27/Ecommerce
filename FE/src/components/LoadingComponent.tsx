import { useEffect, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

type Props = {
	loading: any;
};

const LoadingComponent = ({ loading }: Props) => {
	// useEffect(() => {
	// 	const timer = setTimeout(() => {
	// 		setShowSpinner(false);
	// 	}, delay);

	// 	return () => clearTimeout(timer);
	// }, [delay]);
	// console.log(delay)
	return (
		<div className="flex justify-center items-center h-screen">
			<PulseLoader loading={loading} color="#5C7F9D" size={16} />
		</div>
	);
};

export default LoadingComponent;
