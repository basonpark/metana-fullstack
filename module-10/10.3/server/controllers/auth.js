//handler for login/logout in authrouter
import validator from 'validator';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config.js';

//validate user credentials by plaintext password  
//returns use and signed JWT token on success (without password attribute)
async function authenticateUser({email, password}) {

    console.log("login attempt for email: ", email);

    const user = await User.findOne({email:email});
    if (!user) {
        console.log("=== user not found ", email);
        return;
    }

    //check what we got from database
    console.log("Found user: ", {
        email: user.email,
        hasPassword: !!user.password,
    });

    try {
        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            console.log("=== password not valid");
            return;
        }

        const token = jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
            JWT_SECRET,
            {
                expiresIn: '4h',
            }
        );
        
        return {
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }
        };
    } catch (error) {
        console.log("=== Error during password comparison:", error);
        return;
    }
}

//test if there's a token with valid user
export function isAuthenticated(req) {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        console.log('=== debug: auth token received ', token);
        if (!token) {
            return false;
        }
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        console.error('=== error verifying auth token', error);
    }
}


//log in the user by email and password. set cookie with user details on success
export async function login({req, res}) {
    const {email, password} = req.body;
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
    const result =  await authenticateUser({email, password});
    if (!result) {
        throw new Error('username or password invalid');
    }
    const { user, token } = result;
    return {
        user,
        token,
    };
}