import {axiosInstance} from '../utils/http-client.util';

class ReportsService {

    static async reportByCategories(from, to) {
        const params = {
            ...(from && { from }),
            ...(to && { to }),
        }

        const result = await axiosInstance.get('/reports/categories', { params })
        
        return result.data
    }

    static async reportByDays(days) {
        const params = {
            days
        }

        const result = await axiosInstance.get('/reports/days', { params })
        
        return result.data
    }

}

module.exports = ReportsService
