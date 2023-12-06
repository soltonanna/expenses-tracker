const { ok } = require('assert')

class ReportsService {
    constructor(axiosClient) {
        ok(axiosClient.defaults.baseURL, "baseURL is not set!");
        ok(axiosClient.defaults.headers.common?.Authorization, "AccessToken is not set!");

        this.client = axiosClient;
    }

    async reportByCategories(from, to) {
        const params = {
            ...(from && { from }),
            ...(to && { to }),
        }

        const result = await this.client.get('/reports/categories', { params })
        
        return result.data
    }

    async reportByDays(days) {
        const params = {
            days
        }

        const result = await this.client.get('/reports/days', { params })
        
        return result.data
    }

}

module.exports = ReportsService
