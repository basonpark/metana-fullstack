//handler for login/logout in authrouter
import validator from 'validator';
import User from '../models/User.js';

//validate user credentials by plaintext password
//returns user on success
async function authenticateUser({email, password}) {
    const user = await User.findOne({email:email});
    if (user && user.password === password) {
        return user;
    }
}

//log in the user by email and password. set cookie with user details on success
export async function login({res, email, password}) {
    if (!email || !password) {
        throw new Error('email and password are required');
    }
    //validate input
    const emailValid = validator.isEmail(email);
    const passwordValid = !validator.isEmpty(password);
    if (!emailValid || !passwordValid) {
        throw new Error('validation failed');
    }
    //authenticate user by password
    const user = await authenticateUser({email, password});
    if (!user) {
        throw new Error('invalid username or password');
    }
    res.cookie('user', JSON.stringify(user));
    console.log('=== login successful');
    return user;
}

//log out user
export async function logout(res) {
    res.clearCookie('user');
    console.log('=== logout successful');
}