import axiosInstance from '../utils/http-client.util';

class AuthService {
    static async login(credentials) {
        const result = await axiosInstance.post("/auth/login", credentials);
        return result.data;
    }

    static async refresh(refreshToken) {
        const result = await axiosInstance.post("/auth/refresh", { refreshToken });
        return result.data; 
    }

    static async logout(email) {
        const result = await axiosInstance.post("/auth/logout", { email });
        return result.data;
    }
}

module.exports = AuthService
