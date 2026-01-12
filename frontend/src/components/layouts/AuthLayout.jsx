import React from 'react';
// import { LuTrendingUpDown } from "react-icons/lu";
import QuoteRotator from '../Cards/QuoteRotator';
import icon from "../../assets/images/icon.png"


const AuthLayout = ({ children }) => {
  return (
    <div className='flex'>
        <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12' >
            <h2 className='text-lg font-medium text-black' >Expense Tracker</h2>
            {children}
        </div>

        <div className='hidden md:block w-[40vw] h-screen bg-[#dddcdb] bg-auth-bg-img bg-cover bg-no-repeat bg-center overflow-hidden p-8 relative' >
            <div className='w-48 h-48 rounded-[40px] bg-[#69b352] absolute -top-7 -left-5'/>
            <div className='w-48 h-56 rounded-[40px] border-[20px] border-[#EFBF04] absolute top-[30%] -right-10'/>
            <div className='w-48 h-56 rounded-[40px] bg-[#69b352] absolute -bottom-7 -left-5'/>
            <div className='grid grid-cols-1 z-20'>
                
                <StatsInfoCard 
                    icon={<img src={icon} />}
                    label="Welcome to Expenso! Take control of your finances "
                    />
            </div>
            
            <QuoteRotator />
        </div>
      
    </div>
  )
}

export default AuthLayout;

const StatsInfoCard = ({icon, label, color}) =>{
    return <div className='flex gap-6 bg-[#cda503] p-4 rounded-xl shadow-md shadow-purple-400/10 border border-gray-200/50  z-10'>
        <div className={`w-12 h-12 flex items-center justify-center text-[20px] text-white ${color} rounded-full drop-shadow-xl`}>
            {icon}

        </div>
        <div>
            <h6 className='text-[15px] text-grey-500 mb-1' >{label}</h6>
            <span className='text-[12px]' >
                <p>
                    Start by adding your first transaction, and then explore your personalized dashboard to see your spending habits at a glance.
                </p>
            </span>
        </div>
    </div>
        
}


