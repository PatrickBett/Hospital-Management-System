import axios from "axios"
import { ACCESS_TOKEN } from "./constants"


const api = axios.create({
    // import everything specified inside env variable
    baseURL : import.meta.env.VITE_API_URL
})



api.interceptors.request.use(
    (config) =>{
        // get token if available in localstorage
        const token = localStorage.getItem(ACCESS_TOKEN)
//The && !config.url.includes("/register") ensures that authorization token is 
//included on registration
        if(token && !config.url.includes("/register")){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    
    (error)=>{
        return Promise.reject(error)
    }

)

export default api