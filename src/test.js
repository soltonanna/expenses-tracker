const { login } = require('./auth')
const axios = require('axios');
const AccountsService = require('./services/accounts.service');
const AuthService = require('./services/auth.service');

function handleError(error) {
    console.log(error)
    console.log(error.response?.data)
}


async function main() {
    try {
        const axiosInstance = axios.create({
           baseURL: 'http://localhost:3000/api/v1',
           timeout: 5000
        });


        const authService = new AuthService(axiosInstance);
        
        const credentials = {
            username: 'as@gmail.com',
            password: 'rutrA_SA_92'
        }
        const { accessToken } = await authService.login(credentials)

        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

        const accountsService = new AccountsService(axiosInstance)

        const data = await accountsService.listAll()

        console.log(data)
    } catch (error) {
        handleError(error)
    }
}

main()
