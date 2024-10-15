import { IUser } from "@/interfaces/user";
import { currentUser } from "@/services/AuthService";
import {
	createContext,
	Dispatch,
	ReactNode,
	SetStateAction,
	useEffect,
	useState,
} from "react";

interface AuthContextType {
	authUser?: IUser | undefined;
	setAuthUser?: Dispatch<SetStateAction<IUser | undefined>>;
	isLoggedIn?: boolean;
	setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
}
const AuthContext = createContext<AuthContextType>({});

interface AuthProviderProp {
	children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProp) => {
	const [authUser, setAuthUser] = useState<IUser | undefined>(undefined);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	console.log("authUser context", authUser);
	console.log("isLoggedIn context", isLoggedIn);
	const value = { authUser, setAuthUser, isLoggedIn, setIsLoggedIn };
	useEffect(() => {
		async () => {
			try {
				const { data } = await currentUser();
				setAuthUser(data?.data);
				setIsLoggedIn(true);
			} catch (error) {
				setAuthUser(undefined);
				setIsLoggedIn(false);
			}
		};
	}, []);
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export { AuthProvider, AuthContext };
