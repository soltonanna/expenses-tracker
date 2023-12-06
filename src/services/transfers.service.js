const { ok } = require('assert')

class TransfersService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");
        ok(axiosClient.defaults.headers.common?.Authorization, "AccessToken is not set!");

        this.client = axiosClient;
    }

    async create(payload) {
        const result = await this.client.post("/transfers", payload);
        return result.data;
    }

    async list (accountId, limit, skip) {
        const params = {
            accountId,
            limit,
            skip
        }
        const result = await this.client.get('/transfers', { params });
        return result.data;
    }

    async view (transferId) {
        const result = await this.client.get(`/transfers/${transferId}`);
        return result.data;
    }

    async delete (transferId) {
        const result = await this.client.delete(`/transfers/${transferId}`);
        return result.data;
    }
}

module.exports = TransfersService
