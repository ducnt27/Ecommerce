import classNames from "classnames";

type Props = {
	title: string;
	icon?: string;
	className?: string;
	onClick?: () => void;
	type?: "button" | "submit" | "reset";
};
const ButtonComponent = ({
	title,
	icon,
	className,
	onClick,
	type = "button",
}: Props) => {
	return (
		<>
			<button
				className={classNames(
					"bg-[#9C69E2] relative overflow-hidden group cursor-pointer border-[2px] border-[#9C69E2] text-white text-base  transition-all duration-500",
					className,
				)}
				onClick={onClick}
				type={type}
			>
				<span className="absolute w-80 h-0 transition-all duration-500 origin-center rotate-45 -translate-x-32 bg-white top-1/2 group-hover:h-64 group-hover:-translate-y-32 ease"></span>
				<span className="relative transition-all duration-500 group-hover:text-[#9C69E2]">
					{title}
				</span>
				<span>{icon}</span>
			</button>
		</>
	);
};

export default ButtonComponent;
