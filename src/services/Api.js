import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from 'utils/functions'



export const URL = 'http://localhost:5002/api'
export const profileImg = 'http://localhost:5002'


const user = 'user'
const admin ='admin'

export const non_auth_urls = {
    create_acc: user + `/signup`,
    login: user + '/login',
    verify_email:user +'/verify-email',
    resend_otp: user +'/resend-otp'

}
export const auth_urls = {
    profile: user + '/profile',
    logout: user +'/logout',
    change_img: user + '/upload-img'
}
export const Apis = {
    non_auth: non_auth_urls,
    auth:auth_urls

    
}

export const ClientGetApi = async (endpoint) => {
    const response = await axios.get(`${URL}/${endpoint}`)
    return response.data
}
export const ClientPostApi = async (endpoint, data) => {
    const response = await axios.post(`${URL}/${endpoint}`, data)
    return response.data
}

export const GetApi = async (endpoint) => {
    const getCookie = Cookies.get(CookieName)
    const response = await axios.get(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${getCookie}` // Include the JWT token in the Authorization header
        }
    })
    return response.data
}



export const PostApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
export const LogoutApi = async (endpoint) => {
    const token = Cookies.get(CookieName)
    const response = await axios.post(`${URL}/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
export const PutApi = async (endpoint, data) => {
    const token = Cookies.get(CookieName)
    const response = await axios.put(`${URL}/${endpoint}`, data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return response.data
}
