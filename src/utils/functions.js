import toast from "react-hot-toast"

export const SiteName = 'Banking Application'
export const SiteEmail = 'support@bankname.com'
export const SiteContact = '+23404449430303'
export const Currency = '£'
export const errorMessage = (message) => {
    return toast.error(message, {
        duration: 4000,
        position: "top-center"
    })
}
export const successMessage = (message) => {
    return toast.success(message, {
        duration: 4000,
        position: "top-center",
        
    })
}

export const CookieName = 'bankingmain'
export const UserRole = [
    {
        role: 'user',
        url: '/user'
    },
    {
        role: 'admin',
        url: '/admin/overview'
    }
]