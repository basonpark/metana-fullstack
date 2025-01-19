//context provider for login/logout and authentication routes

import authAPI from '../api/authAPI';

//method that does the actual login, and stores the response data into local storage

export async function login({email, password}) {
    console.log('=== debug: POST to /api/login...');
    const response = await authAPI.login({email, password});
    console.log('=== debug: API response ', response);
    if (!response.success) {
        throw new Error('login failed', response?.message || 'unknown error');
    }
    const { user, token } = response.data;
    if (!user || !token) {
        throw new Error('invalid response data');
    }
    console.log('=== debug: user:', user);
    console.log('=== debug: token:', token);
    
    console.log('=== debug: login successful');
    saveAuthToken(token);
    return user;
}

export async function logout() {
    try {
        removeAuthToken();
        console.log('=== debug: logout successful');
    } catch (error) {
        console.error('=== error logging out', error);
        throw new Error('logout failed', error?.message || 'unknown error');
    }
}

//method that saves the JWT token into local storage
function saveAuthToken(token) {
    localStorage.setItem('authToken', token);
}

//method that removes the JWT token from local storage
function removeAuthToken() {
    localStorage.removeItem('authToken');
}

