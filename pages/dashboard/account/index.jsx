import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { Avatar } from "antd";
import {
  FaPencilAlt,
  FaChartBar,
  FaMoneyBill,
  FaLongArrowAltRight,
} from "react-icons/fa";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Capitalize } from "../../../functions/utilities";

function DashboardAccount({auth}) {
  console.log(auth)
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Account",
    },
  ];
  return (
    <DashboardLayout title={"My Account"} breadcrumb={breadCrumbData}>
      <div className="pt-5 pb-16">
        {/* Header background Section */}
        <div
          className="py-[150px] rounded bg-cover bg-no-repeat bg-fixed flex flex-col items-center justify-center gap-6"
          style={{
            background:
              "linear-gradient(0deg, rgba(73, 163, 241, 0.6), rgba(26, 115, 232, 0.6)), url(/images/header.jpg)",
            backgroundAttachment: "fixed",
          }}
        ></div>

        <div className="bg-white rounded shadow -mt-24 lg:mx-10 mx-auto py-10 px-5">
          {/* Profile Avatar Section */}
          <div className="flex flex-col md:flex-row gap-8 justify-between md:items-center">
            <div className="flex items-center gap-6">
              <Avatar size={150} className="me-2">
                {Capitalize(auth.firstname)}
              </Avatar>
              <div>
                <p className="font-bold text-3xl"> {Capitalize(auth.firstname)} {Capitalize(auth.lastname)} </p>
                <p className="text-lg">Email: {Capitalize(auth.email)}</p>
              </div>
            </div>

            <div>
              <Link href="/dashboard/settings">
                <a className="inline-flex gap-4 items-center bg-brand-red px-7 py-3 rounded transition duration-300 ease-in-out text-white hover:text-white hover:bg-red-700">
                  <span>Edit Profile</span> <FaPencilAlt />
                </a>
              </Link>
            </div>
          </div>

          {/* Account Info Section */}
          <div className=" divide-y md:divide-y-0 md:divide-x py-10 text-lg">
            <div className="py-8 px-4 md:px-8">
              <h3 className="text-2xl font-bold">Account Information</h3>
              <div className="flex flex-col gap-4 pt-8">
                <div>
                  <h4 className="text-xl font-semibold mb-2">About myself:</h4>
                  <p>
                  {Capitalize(auth.bio)}
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Full name: </span>
                    <span>{Capitalize(auth.firstname)} {Capitalize(auth.lastname)}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Phone Number: </span>
                    <span>{auth.phone_number}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Email Adddress: </span>
                    <span>{Capitalize(auth.email)}</span>
                  </p>
                </div>
                <div>
                  <p>
                    <span className="font-bold">Location: </span>
                    <span>{Capitalize(auth.location)}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(DashboardAccount);
