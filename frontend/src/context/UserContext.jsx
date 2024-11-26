import React, {createContext, useContext, useState} from 'react';

// Create UserContext
const UserContext = createContext();

// Custom hook for easy access to context
export const useUser = () => useContext(UserContext);

// Provider Component
export const UserProvider = ({children}) => {
    const [username, setUsername] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    // Method to set user data (e.g., after login)
    const login = (userData) => {
        setUsername(userData.username);
        setAccessToken(userData.accessToken);
    };

    // Method to clear user data (e.g., after logout)
    const logout = () => {
        const url = `${import.meta.env.VITE_API_URL}/users/logout`;
        const options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        };
        fetchWithAuth(url, options);
        setUsername(null);
        setAccessToken(null);
    };

    // Method to fetch with access token automatically included
    const fetchWithAuth = async (url, options = {}) => {
        const headers = {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
        };

        const response = await fetch(url, {...options, headers});
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return response.json();
    };

    return (
        <UserContext.Provider value={{username, login, logout, fetchWithAuth}}>
            {children}
        </UserContext.Provider>
    );
};