import React, {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
} from "react";

type User = {
    email: string;
    username: string;
    roles: number;
    img: string;
    expires: number;
    isLine: boolean;
    isFB: boolean;
    isGg: boolean;
    isEmail: boolean;
    timestamp: number;
} | null | undefined;

type AuthProviderProps = {
    children: React.ReactNode;
};

type AuthContextProps = {
    user: User;
    login: {
        email: string;
        username: string;
        roles: number;
        img: string;
        expires: number;
        isLine: boolean;
        isFB: boolean;
        isGg: boolean;
        isEmail: boolean;
        timestamp: number;
    } | null | undefined;
    logout: () => void;
} | null;

const initUser = {
    email: "",
    username: "",
    roles: 0,
    img: "",
    expires: 0,
    isLine: false,
    isFB: false,
    isGg: false,
    isEmail: false,
    timestamp: 0,
};

export const AuthContext = createContext<AuthContextProps>(null);

const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User>(() => {
        const storedUser: string | null = localStorage.getItem("auth");
        return storedUser ? JSON.parse(storedUser) : initUser;
    });

    useEffect(() => {
        if (user?.username) {
            localStorage.setItem("auth", JSON.stringify(user));
        } else {
            localStorage.removeItem("auth");
        }
    }, [user, user?.username]);

    useEffect(() => {
        const expires = user?.expires;
        if (!expires) return;
        if (expires < Date.now()) {
            setUser(initUser);
            return;
        }        
    }, [user?.expires]);

    const login: any = useCallback((user: any) =>  setUser((prev) => ({  ...prev, ...user, })), [setUser]);
    const logout: any = useCallback(() => setUser(initUser), [setUser]);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const Auth = () => {
    const { user, login, logout } = useContext(AuthContext) || {};
    return {
        isUser: user,
        login,
        logout,
        isAdmin: user?.roles === 150,
    };
};
export default AuthProvider;
