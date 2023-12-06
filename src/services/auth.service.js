const { ok } = require('assert')

class AuthService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");

        this.client = axiosClient;
    }

    async login(credentials) {
        const result = await this.client.post("/auth/login", credentials);
        return result.data;
    }

    async refresh(refreshToken) {
        const result = await this.client.post("/auth/refresh", { refreshToken });
        return result.data;
    }

    async logout(email) {
        const result = await this.client.post("/auth/logout", { email });
        return result.data;
    }
}

module.exports = AuthService
