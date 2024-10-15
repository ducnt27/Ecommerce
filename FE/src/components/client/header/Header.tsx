import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import Menu from "./Menu";

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<header className="bg-gray-100 shadow-md fixed  w-full z-50 padding">
			<div className=" mx-auto flex items-center justify-between h-16">
				{/* Left - Menu Icon (visible on small screens) */}
				<div className="lg:hidden">
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
				<div className="flex text-center lg:text-left">
					<span className="font-bold text-xl">Logo</span>
				</div>
				<div className="">
					<Menu />
				</div>

				{/* Right - Icons */}
				<div className="hidden lg:flex items-center space-x-4">
					<i className="fas fa-search text-xl"></i>
					<div className="relative">
						<i className="fas fa-shopping-cart text-xl"></i>
						<span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
					</div>
					<i className="fas fa-user text-xl"></i>
				</div>
			</div>

			{/* Mobile Menu Overlay */}
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40 transition-opacity duration-300 ${
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
				<nav className="flex flex-col space-y-6 p-6">
					<a href="#" className="text-lg font-medium">
						New
					</a>
					<a href="#" className="text-lg font-medium">
						Tops
					</a>
					<a href="#" className="text-lg font-medium">
						Bottoms
					</a>
					<a href="#" className="text-lg font-medium">
						Kids
					</a>
					<a href="#" className="text-lg font-medium">
						Accessories
					</a>
					<a href="#" className="text-lg font-medium">
						Collections
					</a>
					<a href="#" className="text-lg font-medium">
						Sale
					</a>
				</nav>
			</div>
		</header>
	);
};

export default Header;
