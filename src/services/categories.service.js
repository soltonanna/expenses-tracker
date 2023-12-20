import {axiosInstance} from '../utils/http-client.util';

class CategoriesService {
    static async create(payload) {
        const result = await axiosInstance.post("/categories", payload);
        return result.data;
    }

    static async update(id, update) {
        const result = await axiosInstance.post(`/categories/${id}`, update);
        return result.data;
    }

    static async list (limit, skip) {
        const params = {
            limit,
            skip
        }
        const result = await axiosInstance.get('/categories', { params });
        return result.data;
    }

    static async listCategoryIcons () {
        const result = await axiosInstance.get('/categories/icons');
        return result.data;
    }

    static async view (id) {
        const result = await axiosInstance.get(`/categories/${id}`);
        return result.data;
    }

    static async delete (id) {
        const result = await axiosInstance.delete(`/categories/${id}`);
        return result.data;
    }
}

module.exports = CategoriesService
