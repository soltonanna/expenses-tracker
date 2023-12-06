const { ok } = require('assert')

class UsersService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");
        ok(axiosClient.defaults.headers.common?.Authorization, "AccessToken is not set!");

        this.client = axiosClient;
    }

    async signup(payload) {
        const result = await this.client.post("/users", payload);
        return result.data;
    }

    async verify (email, expiresIn, key) {
        const payload = { email, expiresIn, key };

        const result = await this.client.post('/users/verify', payload);
        
        return result.data;
    }

    async me () {
        const result = await this.client.get('/users/me');

        return result.data;
    }

    async forgotPassword (email) {
        const result = await this.client.post("/users/forgot-password", { email });
        
        return result.data;
    }

    async resetPassword (email, expiresIn, key, newPassword) {
        const payload = { email, expiresIn, key, newPassword }
        
        const result = await this.client.post("/users/forgot-password", payload);
        
        return result.data;
    }

    async updatePassword (oldPassword, newPassword) {
        const payload = { oldPassword, newPassword }
        
        const result = await this.client.patch("/users/update-password", payload);
        
        return result.data;
    }

    async update (update) {
        const result = await this.client.put("/users", update);

        return result.data;
    }
}

module.exports = UsersService
