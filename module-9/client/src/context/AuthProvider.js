//provider for Auth context
import { createContext, useContext, useState, useEffect } from 'react';
import authApi from '../api/authAPI';

//define AuthContext
const AuthContext = createContext({
    user: undefined,
    token: undefined,
    isLoggedIn: false,
    login: async () => {},
    logout: async () => {}
});

//define AuthContext provider. this can be used to wrap the app to provide access to info on the AuthContext
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [token, setToken] = useState('');

    //load previously stored login token when app first loads, allowing persistent login
    useEffect(()=> {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('authToken');
        if (user && token) {
            setUser(JSON.parse(user)); //convert this back from JSON string to object
            setToken(token);
            setIsLoggedIn(true);
        }
    }, [user]);

    async function login({email, password}) {
        const response = await authApi.login({email, password});
        if (!response.success) {
            throw new Error('login failed:', response?.message || 'unknown error');
        }
        const {user, token } = response.data;
        if (!user || !token) {
            throw new Error('invalid response data');
        }

        console.log('login successful');
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('authToken', token);

        setUser(user);
        setToken(token);
        setIsLoggedIn(true);
        return user;
    }

    async function logout() {

        try{
            localStorage.removeItem('user');
            localStorage.removeItem('authToken');
            setUser(null);
            setToken(null);
            setIsLoggedIn(false);
        } catch (error) {
            console.error('Logout error:', error);
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);