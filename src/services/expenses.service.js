import axiosInstance from '../utils/http-client.util';

class ExpensesService {

    static async create(payload) {
        const result = await axiosInstance.post("/expenses", payload);
        return result.data;
    }

    static async list ({ skip, limit }) {
        const params = { skip, limit }
        
        const result = await axiosInstance.get('/expenses', { params });

        return result.data;
    }

    static async view (id) {
        const result = await axiosInstance.get(`/expenses/${id}`);
        return result.data;
    }

    static async delete (id) {
        const result = await axiosInstance.delete(`/expenses/${id}`);
        return result.data;
    }
}

module.exports = ExpensesService
