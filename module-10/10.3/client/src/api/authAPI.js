import axios from 'axios';

const API = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

//login through the backend API and return the response data
export async function login({email, password}) {
    const response = await API.post('/login', {email, password});
    if (response.status === 200) {
        console.log('/api/login success');
        return response.data; //returns user and JWT token
    }
    console.log(`/api/login failure: `, response);
    return false;
}

const authAPI = {
    login,
};

export default authAPI;