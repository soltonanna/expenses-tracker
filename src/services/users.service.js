import axiosInstance from '../utils/http-client.util';

class UsersService {
    
    static async signup(payload) {
        const result = await axiosInstance.post("/users", payload);
        return result.data;
    }

    static async verify (email, expiresIn, key) {
        const payload = { email, expiresIn, key };

        const result = await axiosInstance.post('/users/verify', payload);
        
        return result.data;
    }

    static async me () {
        const result = await axiosInstance.get('/users/me');

        return result.data;
    }

    static async forgotPassword (email) {
        const result = await axiosInstance.post("/users/forgot-password", { email });
        
        return result.data;
    }

    static async resetPassword (email, expiresIn, key, newPassword) {
        const payload = { email, expiresIn, key, newPassword }
        
        const result = await axiosInstance.post("/users/forgot-password", payload);
        
        return result.data;
    }

    static async updatePassword (oldPassword, newPassword) {
        const payload = { oldPassword, newPassword }
        
        const result = await axiosInstance.patch("/users/update-password", payload);
        
        return result.data;
    }

    static async update (update) {
        const result = await axiosInstance.put("/users", update);

        return result.data;
    }
}

export default UsersService;
