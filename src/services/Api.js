import axios from 'axios'
import Cookies from 'js-cookie'
import { CookieName } from 'utils/functions'


/*

Database 
password = greenfordbank.com 
username & database = greenfor_banking

Email 
email = support@greenfordbank.com 
password = greenfordbank.com

JIVO 
password = greenfordBank.com
email = support@greenfordbank.com


*/

export let URL;
export let profileImg;

if(window.location.origin.includes('localhost')) {
    URL = 'http://localhost:5002'
    profileImg = 'http://localhost:5002'
}

if(window.location.origin.includes('greenfordbank.com')) {
    URL = 'https://api.greenfordbank.com'
    profileImg = 'https://api.greenfordbank.com'
}



const user = 'user'
const admin = 'admin'

export const non_auth_urls = {
    create_acc: user + `/signup`,
    change_user_pass: user +'/change-pass',
    login: user + '/login',
    verify_email: user + '/verify-email',
    verify_emailpass: user + '/verify-emailpass',
    resend_otp: user + '/resend-otp',
    change_img: user + '/upload-img',
    find_account: user + '/find-account',
    email_sub: user + '/email-subscribe',
    contact_us: user + '/contact'
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
    deposit: user + '/deposit',
    get_transfers : user + '/find-transfers',
    get_verifications : user + '/find-verifications',
    get_adminBanks: user +'/admin-banks',
    transfer: user + '/transfer',
    upload_trans_prof: user +'/upload-proof',
    user_transfers : user + '/user-transfers',
    all_savings : user + '/all-savings',
    verify_otp: user + '/verify-otp',
    withdraw_savings : user + '/withdraw-savings',
    save_history: user + '/save-history'
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
    validate_depo: admin + '/validate-depo',
    create_user: admin + '/create-user',
    find_email: admin + '/find-email',
    inititate_depo: admin + '/initiate-depo',
    initiate_with: admin + '/initiate-with',
    trans_date: admin + '/trans-date',
    add_bank: admin + '/add-bank',
    hide:admin + '/hide',
    admin_banks: admin +'/admin-banks',
    create_verify: admin + '/create-verify',
    update_verify: admin + '/update-verify',
    decline_depo: admin + '/decline-depo',
    settled_depos: admin + '/settled-depo',
    remove_bank: admin + '/remove-bank',
    contacts:admin + '/contacts',
    subs:admin + '/subs',
    all_transfers: admin + '/all-transfers',
    confirm_trans: admin + '/confirm-trans',
    otp: admin + '/otp',
    single_trans: admin + '/single-trans'
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
