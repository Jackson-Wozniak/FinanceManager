import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => {},
    logout: () => {},
});
export const useAuth = () => useContext(AuthContext);

const AuthProvider: React.FC<{
    children: React.ReactNode
}> = ({children}) => {
    const [token, setToken] = useState(() => localStorage.getItem('token') || null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token === null){
            navigate('/login');
        }
    }, [token, navigate]);

    const login = (newToken: string) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;
