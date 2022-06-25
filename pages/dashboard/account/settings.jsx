import {FaUser, FaInfoCircle, FaLock, FaTrash} from 'react-icons/fa';
import AccountSettingsForm from "../../../components/elements/dashboardsettings/AccountSettingsForm";
import DeleteAccount from '../../../components/elements/dashboardsettings/DeleteAccount';
import PasswordResetForm from "../../../components/elements/dashboardsettings/PasswordResetForm";
import Profile from '../../../components/elements/dashboardsettings/Profile';
import DashboardLayout from '../../../components/layouts/DashboardLayout';

function DashboardSettings() {


    const breadCrumbData = [
        {
            name: "Dashboard",
            link: "/dashboard"
        },
        {
            name: "Settings"
        },
        
    ]

    const sidebarDatas = [
        {
            name: "Profile",
            link: "#profile",
            icon: <FaUser />
        },
        {
            name: "Account Info",
            link: "#account_info",
            icon: <FaInfoCircle />
        },
        // {
        //     name: "Change Password",
        //     link: "#change_password",
        //     icon: <FaLock />
        // },
        // {
        //     name: "Delete Account",
        //     link: "#delete_account",
        //     icon: <FaTrash />
        // },
    ]
    return (
      <DashboardLayout title={"Account Settings"} breadcrumb={breadCrumbData}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 px-2 py-8">
          <div className="lg:col-span-3 bg-white rounded px-4 py-5 flex flex-col divide-y lg:sticky top-5 self-start shadow-lg">
            {sidebarDatas.map((data) => (
              <a
                key={data.name}
                href={data.link}
                className="inline-flex gap-3 py-4 items-center text-gray-700 hover:text-brand-red"
              >
                <div className="text-lg ">{data.icon}</div>
                <p>{data.name}</p>
              </a>
            ))}
          </div>

          <div className="lg:col-span-9 flex flex-col gap-8">
            <Profile />
            <AccountSettingsForm />
            {/* <PasswordResetForm /> */}
            {/* <DeleteAccount /> */}
          </div>
        </div>
      </DashboardLayout>
    );
}

export default DashboardSettings
