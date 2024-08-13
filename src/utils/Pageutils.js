import {PiUserBold} from 'react-icons/pi'
import {GiReceiveMoney} from 'react-icons/gi'
import { BsPiggyBank } from 'react-icons/bs'
import img from 'assets/img.jpg'
import img1 from 'assets/img1.jpg'
import img2 from 'assets/img2.jpg'
import img3 from 'assets/img3.jpg'
import img4 from 'assets/img4.jpg'


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

    {img: img1, content: `"I’ve been with [Bank Name] for over a decade, and they have consistently exceeded my expectations. Their support during the early stages of my business was invaluable, offering customized loan solutions that helped us grow. The personalized service I receive makes me feel like a valued client, not just another account number."`, user: 'John M., Small Business Owner'},
    {img: img, content: `"When we were looking to buy our first home, [Bank Name] made the process smooth and stress-free. Their mortgage specialists took the time to understand our needs and walked us through every step. We couldn’t be happier with the rates and the service. They turned our dream of homeownership into a reality."`, user: 'Sarah L., Homeowner'},
    {img: img2, content: `"As a freelancer, managing finances can be challenging, but [Bank Name] has made it easier with their flexible and user-friendly online banking tools. Their customer service is top-notch, always ready to help whenever I have a question. I recommend them to anyone looking for a reliable banking partner."`, user: 'David R., Freelance Consultant'},
    {img: img3, content: `"After retiring, I was concerned about managing my savings and ensuring financial security. [Bank Name] offered me a tailored plan that aligns with my retirement goals. Their financial advisors are knowledgeable and approachable, making me feel confident in my financial future. I couldn’t ask for a better bank."`, user: 'Emily S., Retiree'},
    {img: img4, content: `"As a student, budgeting and saving can be tough, but [Bank Name] has made it much easier. Their student account has no hidden fees, and the mobile app is super convenient for managing my money on the go. Plus, their customer service is always helpful when I have questions. I highly recommend them to all students!"`, user: 'Michael B., College Student'},
]