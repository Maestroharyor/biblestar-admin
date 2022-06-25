import Image from 'next/image';
import {AiFillBell, AiFillCaretDown} from 'react-icons/ai';
import {Badge} from 'antd';
import { connect, useDispatch } from "react-redux";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import UserDetails from '../../components/elements/dashboardindex/UserDetails';
import UserActions from '../../components/elements/dashboardindex/UserActions';
import UserProfileCard from '../../components/elements/dashboardindex/UserProfileCard';
// import UserGraphDetails from '../../components/elements/dashboardindex/UserGraphDetails';
import UserStatsSummary from '../../components/elements/dashboardindex/UserStatsSummary';
// import Calendar from '../../components/elements/dashboardindex/Calendar';
import UserTableDetails from '../../components/elements/dashboardindex/UserTableDetails'

function DashboardIndex({auth}) {
    const breadCrumbData = [
        {
            name: "Dashboard"
        },
        
    ]
    return (
        <DashboardLayout title = {"Dashboard"} breadcrumb = {breadCrumbData}>
            <div className=''>
                <div className=' px-5'>
                    <div className='flex flex-col sm:flex-row gap-5 flex-wrap justify-between'>
                        <div className=''>
                                {/* <div className="hidden lg:block">
                                <Image
                                src="/images/logo.png"
                                alt = "Bible Star TV Logo"
                                height={107}
                                width={102}
                                />
                                </div> */}
                                
                                <h1 className='text-4xl font-bold'>Dashboard</h1>
                        </div>

                    </div>
                    {/* <UserDetails /> */}
                    <UserActions />
                    <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 pb-10 items-start'>
                        {auth.isLoggedIn && <UserProfileCard />}
                        {/* <UserGraphDetails /> */}
                        <UserTableDetails />
                    </div>  


                </div>
            </div>
        </DashboardLayout>
    )
}

const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(DashboardIndex);