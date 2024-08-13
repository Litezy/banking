import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa6';

const FAQ = () => {

    const FAQS = [
        {
            ques: 'What are the transaction fees on the platform?',
            ans: "We offer some of the lowest transaction fees in the industry. Our goal is to help you save more by charging minimal fees on every transaction you make. Whether you're transferring funds locally or internationally, you can rest assured that our fees are competitive and transparent."
        },
        {
            ques: 'How do I set up and manage my savings goals?',
            ans: "Setting up your savings goals is simple. Just log into your account, navigate to the 'Savings' section, and follow the prompts to create your goal. You can name your goal, set a target amount, and even choose a timeline. We'll help you track your progress and stay on course to achieve your financial objectives."
        },
        {
            ques: 'Is my money safe on your platform?',
            ans: "Absolutely. We prioritize your security and have implemented advanced encryption technologies to protect your funds and personal information. Additionally, our platform is fully compliant with international banking regulations, ensuring that your money is safe and secure at all times."
        },
      
        {
            ques: 'How do I track my savings progress?',
            ans: "You can easily track your savings progress in the 'Savings' section of your account. Here, you’ll see a visual representation of how close you are to reaching your goal, along with details of your contributions and any interest earned."
        },
        {
            ques: 'Are there any rewards for saving regularly?',
            ans: "Yes! We believe in rewarding our users for their dedication. By saving regularly, you may become eligible for various rewards, such as cashback offers, bonus interest rates, or even entry into special promotions. Keep an eye on your account notifications for details."
        },
        {
            ques: 'How can I get the best out of my account?',
            ans: "To maximize your experience, we recommend exploring all the features our platform offers. From setting up multiple savings goals to taking advantage of our low transaction fees for international transfers, there’s a lot to gain. Additionally, staying informed through our newsletters will help you make the most of your account."
        },
    ];

    const [active, setActive] = useState(null);
    const [icon, setIcon] = useState(false);

    const selectAns = (i) => {
        setActive(active === i ? null : i);
    };
  return (
    <div>

<div className="py-20 w-full">
                

                <div className="mt-10 w-full">
                    {FAQS.map((item, i) => {

                        return (
                            <div onClick={() => selectAns(i)} className={`nunito cursor-pointer ${active === i ? 'h-fit py-2 bg-green  transition-all duration-300' : 'transition-all duration-300 h-fit py-2 bg-gray'} w-full lg:px-5 px-2 mb-3 rounded-xl gap-5  lg:py-5`} key={i}>
                                <div className="flex items-center w-full justify-between">
                                    <div className="font-bold text-lg lg:text-xl">{item.ques}</div>
                                    <div className="">
                                         <FaPlus className={` ${active === i &&'rotate-45 transition-all delay-100 '} lg:text-2xl text-lg font-bold cursor-pointer`} />
                                    </div>
                                </div>
                                {active === i && <div className="p1-2 mt-2">{item.ans}</div>}
                            </div>
                        );
                    })}
                </div>
            </div>
    </div>
  )
}

export default FAQ