import {axiosInstance} from '../utils/http-client.util';

class TransfersService {

    static async create(payload) {
        const result = await axiosInstance.post("/transfers", payload);
        return result.data;
    }

    static async list (accountId, limit, skip) {
        const params = {
            accountId,
            limit,
            skip
        }
        const result = await axiosInstance.get('/transfers', { params });
        return result.data;
    }

    static async view (transferId) {
        const result = await axiosInstance.get(`/transfers/${transferId}`);
        return result.data;
    }

    static async delete (transferId) {
        const result = await axiosInstance.delete(`/transfers/${transferId}`);
        return result.data;
    }
}

module.exports = TransfersService
