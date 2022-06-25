// import { } from 'react-icons/ai';
import {FaWallet, FaUserCircle, FaChartBar, FaUsers, FaMoneyBill} from 'react-icons/fa';

function UserDetails() {
    const userDets = [
        {
            title: "Wallet Balance",
            result: "₦500",
            icon: <FaWallet />
        },
        {
            title: "Total Attempts",
            result: "20",
            icon: <FaUserCircle />
        },
        {
            title: "Total Points",
            result: "10",
            icon: <FaChartBar />
        },
        {
            title: "Total Participants",
            result: "180",
            icon: <FaUsers />
        },
        {
            title: "Amount Spent",
            result: "#1000",
            icon: <FaMoneyBill />
        },
    ]
    return (
        <div className="mt-5 py-4 px-5 bg-gray-200 rounded grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 justify-between items-center">
        {userDets.map(userDet => (
            <div className='flex items-center gap-3' key={userDet.title}>
               <div className='text-6xl text-gray-800'>
                   {userDet.icon}
               </div>
                
                <div>
                    <p className='text-[16px] leading-[1.1] text-blue-600'>{userDet.title}</p>
                    <p className='font-bold text-2xl'>{userDet.result}</p>
                </div>
           </div>
        ))}
        </div>
    )
}

export default UserDetails
