const { ok } = require('assert')

class ExpensesService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");
        ok(axiosClient.defaults.headers.common?.Authorization, "AccessToken is not set!");

        this.client = axiosClient;
    }

    async create(payload) {
        const result = await this.client.post("/expenses", payload);
        return result.data;
    }

    async list ({ skip, limit }) {
        const params = { skip, limit }
        
        const result = await this.client.get('/expenses', { params });

        return result.data;
    }

    async view (id) {
        const result = await this.client.get(`/expenses/${id}`);
        return result.data;
    }

    async delete (id) {
        const result = await this.client.delete(`/expenses/${id}`);
        return result.data;
    }
}

module.exports = ExpensesService
