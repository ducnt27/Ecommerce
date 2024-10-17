import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Actions from "./Actions";
import Menu from "./Menu";
import MenuMobile from "./MenuMobile";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="bg-transparent fixed  w-full z-50 padding">
			<div className=" mx-auto flex items-center justify-between h-16">
				{/* Left - Menu Icon (visible on small screens) */}
				<div className="md:hidden">
					<button
						onClick={toggleMenu}
						className="text-2xl focus:outline-none"
						aria-label="Toggle Menu"
					>
						<IoMenu />
						{/* Menu Icon */}
					</button>
				</div>

				{/* Middle - Logo */}
				<div className="flex text-center md:text-left">
					<span className="font-bold text-xl">Logo</span>
				</div>
				<div className="hidden md:flex">
					<Menu />
				</div>

				{/* Right - Icons */}
				<div className=" ">
					<Actions />
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 md:hidden z-40 transition-opacity duration-300 ${
					isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
				}`}
				onClick={toggleMenu}
			></div>

			{/* Mobile Menu Sidebar */}
			<div
				className={`fixed top-0 left-0 w-64 h-full bg-white z-50 transform transition-transform duration-300 ${
					isMenuOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<MenuMobile />
			</div>
		</header>
	);
};

export default Header;
