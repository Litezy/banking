import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from 'utils/functions'



export const URL = 'http://localhost:5002/api'
export const profileImg = 'http://localhost:5002'


const user = 'user'
const admin = 'admin'

export const non_auth_urls = {
    create_acc: user + `/signup`,
    login: user + '/login',
    verify_email: user + '/verify-email',
    resend_otp: user + '/resend-otp',
    change_img: user + '/upload-img',
    find_account: user + '/find-account'
}
export const auth_urls = {
    profile: user + '/profile',
    logout: user + '/logout',
    edit_profile: user + '/edit-profile',
    user_savings: user + '/user-savings',
    topup: user + '/top-up',
    create_savings: user + '/create-savings',
    trans_history: user + '/trans-history',
    delete_savings: user + '/delete-savings',
    all_cards: user + '/user-cards',
    create_card: user + '/create-card',
    user_notifications: user + '/user-notifications',
    markas_read: user + '/mark-read',
    change_password: user + '/change-password',
    change_email: user + '/change-email',
    email_otp: user + '/email-otp',
    mark_all: user + '/all-read',
    get_banks: user + '/get-user-banks',
    add_bank: user + '/add-bank',
    deposit: user + '/deposit'
}

export const admin_urls = {
    all_users: admin + '/all-users',
    all_depo: admin + '/all-depo',
    all_kyc: admin + '/all-kyc',
    all_proofs: admin + '/all-proofs',
    all_plans: admin + '/all-plans',
    all_trans: admin + '/all-trans',
    all_banks: admin + '/all-banks',
    all_cards: admin + '/all-cards',
    create_user: admin + '/create-user',
}
export const Apis = {
    non_auth: non_auth_urls,
    auth: auth_urls,
    admin: admin_urls


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
