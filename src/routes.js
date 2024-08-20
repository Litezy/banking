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
import AllTransfers from "admin/adminComponents/AllTransfers";
import AllUsers from "admin/adminComponents/AllUsers";
import AllTransactions from "admin/adminComponents/AllTransactions";
import AdminSettings from "admin/adminComponents/AdminSettings";
import Banks from "admin/adminComponents/Banks";
import Contacts from "admin/adminComponents/Contacts";
import Newsletters from "admin/adminComponents/Newsletters";
import Services from "components/general/Services";
import ContactUs from "components/general/ContactUs";
import AboutUs from "components/general/AboutUs";
import Verifications from "admin/adminComponents/Verifications";
import PrivacyPolicy from "components/general/PrivacyPolicy";
import TermsofUse from "components/general/TermsofUse";
import Cookies from "components/general/Cookies";
import UserVerifications from "admin/adminComponents/UserVerifications";





export const FormRoutes = [
    { path: '/signup', component: Signup },
    { path: '/login', component: Login },
    { path: '/forgot-password', component: ForgotPassword },
    { path: '/verify-email', component: VerifyEmailAccount },
    { path: '/change-password', component: ChangePassword },
]

export const GeneralRoutes = [
    { path: '/', component: Home },
    { path: '*', component: Notfound },
    { path: 'services', component: Services },
    { path: 'contact-us', component: ContactUs },
    { path: 'about-us', component: AboutUs },
    { path: 'privacy-policy', component: PrivacyPolicy },
    { path: 'terms', component: TermsofUse },
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
    { path: 'transfers', component: AllTransfers },
    { path: 'transactions', component: AllTransactions },
    { path: 'users', component: AllUsers },
    { path: 'verifications', component: Verifications },
    { path: 'banks', component: Banks },
    { path: 'contacts', component: Contacts },
    { path: 'newsletters', component: Newsletters },
    { path: 'verifications/:id', component: UserVerifications },
   
   
]