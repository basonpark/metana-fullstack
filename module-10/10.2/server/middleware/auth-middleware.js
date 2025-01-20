//middleware for authentication and authorization

import { isAuthenticated } from '../controllers/auth.js';

//validate the logged in user
export function isLoggedIn(req, res, next) {
    if (!isAuthenticated(req)) {
        return res.status(403).json({error: 'login validation failed'});
    } else {
        console.log('login validation successful');
        next();
    }
}

//TODO: validate the logged i user has admin role
export function isAdmin(req, res, next) {
    next();
}