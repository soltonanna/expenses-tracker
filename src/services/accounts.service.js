import axiosInstance from '../utils/http-client.util';

class AccountsService {

    static async create(payload) {
        const result = await axiosInstance.post("/accounts", payload);
        return result.data;
    }

    static async listAll () {
        const result = await axiosInstance.get('/accounts');
        return result.data;
    }

    static async view (accountId) {
        const result = await axiosInstance.get(`/accounts/${accountId}`);
        return result.data;
    }

    static async delete (accountId) {
        const result = await axiosInstance.delete(`/accounts/${accountId}`);
        return result.data;
    }
}

module.exports = AccountsService
