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
import TopUpsavings from "user/TopUpsavings";




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