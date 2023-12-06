const { ok } = require('assert')

class AccountsService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");
        ok(axiosClient.defaults.headers.common?.Authorization, "AccessToken is not set!");

        this.client = axiosClient;
    }

    async create(payload) {
        const result = await this.client.post("/accounts", payload);
        return result.data;
    }

    async listAll () {
        const result = await this.client.get('/accounts');
        return result.data;
    }

    async view (accountId) {
        const result = await this.client.get(`/accounts/${accountId}`);
        return result.data;
    }

    async delete (accountId) {
        const result = await this.client.delete(`/accounts/${accountId}`);
        return result.data;
    }
}

module.exports = AccountsService
