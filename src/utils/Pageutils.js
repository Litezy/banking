import {PiUserBold} from 'react-icons/pi'
import {GiReceiveMoney} from 'react-icons/gi'
import { BsPiggyBank } from 'react-icons/bs'
import img from 'assets/img.jpg'
import img1 from 'assets/img1.jpg'
import img2 from 'assets/img2.jpg'
import img3 from 'assets/img3.jpg'
import img4 from 'assets/img4.jpg'
import { TbTransactionDollar } from "react-icons/tb";
import { BiTransferAlt } from "react-icons/bi";
import { BsPersonArmsUp } from "react-icons/bs";
import { MdSavings } from "react-icons/md";
import { MdOutlineSecurity } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { MdSupportAgent } from "react-icons/md";
import { MdOutlineManageAccounts } from "react-icons/md";
import { GiPodiumWinner } from "react-icons/gi";
import { SiteName } from './functions'


export const HomeServices  = [
    {
        title: 'Open an account',
        content: 'Open an account with us and gain access to global money transfer',
        Icon: PiUserBold,
    },
    {
        title: 'Money transfer',
        content: 'Reliable, safe and secure ways to send and recieve money globally',
        Icon: GiReceiveMoney,
    },
    {
        title: 'Saving goals',
        content: 'Reduce exessive spendings and shortage of finance by increasing your savings effortlessly',
        Icon: BsPiggyBank,
    },
]

export const HomeAnalyses = [
    {title: 'total users', total: 46, type: 'K  '},
    {title: 'active users', total: 32, type: 'K'},
    {title: 'daily transactions', total: 450, type: 'K'},
    {title: 'weekly transactions', total: 3.5, type: 'B'},
]

export const HomeTestimonials = [

    {img: img1, content: `"I’ve been with ${SiteName} for over a decade, and they have consistently exceeded my expectations. Their support during the early stages of my business was invaluable, offering customized loan solutions that helped us grow. The personalized service I receive makes me feel like a valued client, not just another account number."`, user: 'John M., Small Business Owner'},
    {img: img, content: `"When we were looking to buy our first home, ${SiteName} made the process smooth and stress-free. Their mortgage specialists took the time to understand our needs and walked us through every step. We couldn’t be happier with the rates and the service. They turned our dream of homeownership into a reality."`, user: 'Sarah L., Homeowner'},
    {img: img2, content: `"As a freelancer, managing finances can be challenging, but ${SiteName} has made it easier with their flexible and user-friendly online banking tools. Their customer service is top-notch, always ready to help whenever I have a question. I recommend them to anyone looking for a reliable banking partner."`, user: 'David R., Freelance Consultant'},
    {img: img3, content: `"After retiring, I was concerned about managing my savings and ensuring financial security. ${SiteName} offered me a tailored plan that aligns with my retirement goals. Their financial advisors are knowledgeable and approachable, making me feel confident in my financial future. I couldn’t ask for a better bank."`, user: 'Emily S., Retiree'},
    {img: img4, content: `"As a student, budgeting and saving can be tough, but ${SiteName} has made it much easier. Their student account has no hidden fees, and the mobile app is super convenient for managing my money on the go. Plus, their customer service is always helpful when I have questions. I highly recommend them to all students!"`, user: 'Michael B., College Student'},
]

export const services = [
    {
        title:'Seamless International Transfers',
        desc:"Effortlessly send and receive money across borders with our intuitive platform. We support multiple currencies, ensuring your funds are transferred quickly and securely, all while offering some of the most competitive rates in the market.",
        icon: <BiTransferAlt/>
    },
    {
        title:'Low Transaction Fees',
        desc:"Keep more of your money where it belongs—with you. We charge minimal fees on every transaction, whether local or international, so you can save more and spend less on unnecessary costs.",
        icon: <TbTransactionDollar/>
    },
    {
        title:'Personalized Savings Goals',
        desc:"Achieve your financial dreams with our tailored savings goals feature. Set specific targets, track your progress, and enjoy the satisfaction of reaching your goals with our easy-to-use tools.",
        icon: <BsPersonArmsUp/>
    },
    {
        title:'Automated Savings',
        desc:"Make saving effortless by setting up automated contributions to your savings goals. Whether you want to save weekly, bi-weekly, or monthly, we’ve got you covered. Sit back and watch your savings grow without lifting a finger.",
        icon: <MdSavings/>
    },
    {
        title:'Comprehensive Account Management',
        desc:"Manage your account with ease. From tracking transactions to setting budgets, our user-friendly dashboard puts all your financial tools in one place, giving you complete control over your finances.",
        icon: <FcManager/>
    },
    {
        title:'Robust Security',
        desc:"Your security is our top priority. We use advanced encryption and multi-factor authentication to protect your personal and financial information, ensuring your peace of mind with every transaction.",
        icon: <MdOutlineSecurity/>
    },
    {
        title:'24/7 Customer Support',
        desc:"Our dedicated customer support team is available around the clock to assist you with any questions or concerns. Whether you need help with a transaction or have a query about our services, we’re just a call or click away.",
        icon: <MdSupportAgent/>
    },
    {
        title:'Flexible Fund Management',
        desc:"Easily move funds between your accounts or send money to others with just a few clicks. Our platform makes fund management flexible and straightforward, so you can handle your finances with confidence.",
        icon: <MdOutlineManageAccounts/>
    },
    {
        title:'Rewards and Incentives',
        desc:"Enjoy exclusive rewards for being a loyal user. From cashback on transactions to bonuses on savings, we believe in giving back to our customers. Stay tuned for exciting offers and promotions designed just for you.",
        icon: <GiPodiumWinner/>
    },

]