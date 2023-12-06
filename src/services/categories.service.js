const { ok } = require('assert')

class CategoriesService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");
        ok(axiosClient.defaults.headers.common?.Authorization, "AccessToken is not set!");

        this.client = axiosClient;
    }

    async create(payload) {
        const result = await this.client.post("/categories", payload);
        return result.data;
    }

    async update(id, update) {
        const result = await this.client.post(`/categories/${id}`, update);
        return result.data;
    }

    async list (limit, skip) {
        const params = {
            limit,
            skip
        }
        const result = await this.client.get('/categories', { params });
        return result.data;
    }

    async listCategoryIcons () {
        const result = await this.client.get('/categories/icons');
        return result.data;
    }

    async view (id) {
        const result = await this.client.get(`/categories/${id}`);
        return result.data;
    }

    async delete (id) {
        const result = await this.client.delete(`/categories/${id}`);
        return result.data;
    }
}

module.exports = CategoriesService
