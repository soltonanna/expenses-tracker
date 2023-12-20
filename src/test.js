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

/*
{
"user":{"userId":"657f1b8e80c9b9fc13c9dd36",email":"anahi@gmail.com"},"accessToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdmMWI4ZTgwYzliOWZjMTNjOWRkMzYiLCJlbWFpbCI6ImFuYWhpQGdtYWlsLmNvbSIsImlhdCI6MTcwMjg5NDEwMywiZXhwIjoxNzAyODk3NzAzfQ.M9PHzgVr_4MakwnJjE0J6BPSZpY0bmLmPvC43gnl4y8","refreshToken":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTdmMWI4ZTgwYzliOWZjMTNjOWRkMzYiLCJlbWFpbCI6ImFuYWhpQGdtYWlsLmNvbSIsImlhdCI6MTcwMjg5NDEwMywiZXhwIjoxNzAyOTMwMTAzfQ.ooJgMHRRcVLTpUG1s46aEGBT32_40G6dZskRtt5D2Go"
}
*/