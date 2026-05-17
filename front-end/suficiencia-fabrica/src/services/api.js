import axios from 'axios'

const api = axios.create({
    baseURL: 'https://suficiencia-fabrica.onrender.com'
})

export default api