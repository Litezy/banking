import Signup from "forms/Signup";
import Home from "./general/Home";
import Dashboard from "./user/Dashboard";
import Notfound from "general/Nofound";
import Login from "forms/Login";
import ForgotPassword from "forms/ForgotPassword";
import VerifyEmailAccount from "forms/VerifyEmail";
import ChangePassword from "forms/ChangePassword";
import Savings from "user/Savings";
import Transfer from "user/Transfer";
import Transactions from "user/Transactions";
import Notifications from "user/Notifications";
import Settings from "user/Settings";
import Profile from "user/Profile";
import Loans from "user/Loans";
import AdminDashboard from "admin/AdminDashboard";
import AllSavings from "admin/adminComponents/AllSavings";
import AllTransfers from "admin/adminComponents/AllTransfers";
import AllUsers from "admin/adminComponents/AllUsers";
import CreateLoans from "admin/adminComponents/CreateLoans";
import AllTransactions from "admin/adminComponents/AllTransactions";
import AdminSettings from "admin/adminComponents/AdminSettings";




export const FormRoutes = [
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/verify-email', component: VerifyEmailAccount },
    { path: '/change-password', component: ChangePassword },
]

export const GeneralRoutes = [
    { path: '', component: Home },
    { path: '*', component: Notfound },
]


export const UserRoutes = [
    { path: '', component: Dashboard },
    { path: 'savings', component: Savings },
    { path: 'transfer', component: Transfer },
    { path: 'transactions', component: Transactions },
    { path: 'notifications', component: Notifications },
    { path: 'settings', component: Settings },
    { path: 'profile', component: Profile },
    { path: 'loans', component: Loans },
   
]
export const AdminRoutes = [
    { path: 'overview', component: AdminDashboard },
    { path: 'savings', component: AllSavings },
    { path: 'transfers', component: AllTransfers },
    { path: 'transactions', component: AllTransactions },
    { path: 'users', component: AllUsers },
    { path: 'loans', component: CreateLoans },
    { path: 'settings', component: AdminSettings },
   
]