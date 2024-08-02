import toast from "react-hot-toast"

export const SiteName = 'Banking Application'
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
        url: '/admin'
    }
]