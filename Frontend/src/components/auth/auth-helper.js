import { jwtDecode } from "jwt-decode";

const authenticate = (token, cb) => {
    if (typeof window !== "undefined") {
        sessionStorage.setItem('token', token);

        let decoded = jwtDecode(token);
        sessionStorage.setItem('username', decoded.username)
        sessionStorage.setItem('id', decoded.id);
        
    }
    cb();
}

const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return !!sessionStorage.getItem('token');
}

const getToken = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem('token');
}

const getUsername = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem('username');
}

const getUserId = () => {
    if (typeof window === "undefined") {
        return false;
    }
    return sessionStorage.getItem('id');
};

const clearJWT = () => {
    if (typeof window !== "undefined") {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
    }
}

export { authenticate, isAuthenticated, getToken, getUsername, getUserId, clearJWT }