import axios from 'axios';

export async function privateApiExample(token) {
    const url = '/api/private';
    if (!token) {
        throw new Error('token required for protected API route: ' + url);
    }
    return axios.get(url, {
        headers: {Authorization: 'Bearer ' + token},
    });

}

const protectedAPI = {
    privateApiExample,
};

export default protectedAPI;