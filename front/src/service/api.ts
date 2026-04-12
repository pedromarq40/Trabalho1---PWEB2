import axios from 'axios'

const PORT = 3000
const URL = `http://localhost:${PORT}`

const api = axios.create({
    baseURL : URL
})

export default api