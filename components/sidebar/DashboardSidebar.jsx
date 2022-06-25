import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillAppstore, AiFillSetting } from "react-icons/ai";
import {
  FaUser,
  FaHome,
  FaUsers,
  FaEnvelopeOpenText,
  FaPowerOff,
  FaStickyNote,
  FaQuestionCircle, FaPlayCircle, FaMailBulk
} from "react-icons/fa";
import { MdFormatAlignLeft, MdOutlineBarChart } from "react-icons/md";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { Tooltip } from "antd";
import { connect, useDispatch } from "react-redux";
import { logOutSuccess } from "../../store/auth/action";
import { userNotificationSuccess } from "../../functions/notification";

function DashboardSidebar(props) {
  const router = useRouter()
  const dispatch = useDispatch()
  // console.log(Router.pathname)
  const [mobileMenu, setMobileMenu] = useState(false);
  const dashboardRoutes = [
    {
      name: "Dashboard",
      link: "",
      icon: <AiFillAppstore />,
    },
    // {
    //   name: "HomePage",
    //   link: "/homepage",
    //   icon: <FaHome />,
    // },
    {
      name: "Posts",
      link: "/posts",
      icon: <FaStickyNote />,
    },
    {
      name: "Users",
      link: "/users",
      icon: <FaUsers />,
    },
    {
      name: "Questions",
      link: "/questions",
      icon: <FaQuestionCircle />,
    },
    {
      name: "Homeplay",
      link: "/homeplays",
      icon: <FaPlayCircle />,
    },
    {
      name: "Newsletters",
      link: "/newsletters",
      icon: <FaMailBulk />,
    },
    // {
    //   name: "Messages",
    //   link: "/messages",
    //   icon: <FaEnvelopeOpenText />,
    // },
    {
      name: "Funds Reports",
      link: "/reports",
      icon: <MdOutlineBarChart />,
    },
    {
      name: "Account",
      link: "/account",
      icon: <FaUser />,
    },
    {
      name: "Account Settings",
      link: "/account/settings",
      icon: <AiFillSetting />,
    },
  ];
  return (
    <>
      <aside id="sidebar_desktop" className="bg-gray-900 relative">
        {/* <MdFormatAlignLeft /> */}

        <div className="hidden md:flex flex-col text-lg pt-2 pb-5 sticky top-0">
        <div className="flex items-center justify-center w-full text-center mb-3">
          <a className="" href="bible-star-tv.vercel.app/" target={"_blank"}>
            <Image
                  src="/images/logo.png"
                  alt="Bible Star TV Logo"
                  height={57}
                  width={52}
                  
                />
          </a>
                
              </div>
          {dashboardRoutes.map((route) => (
                <Link href={`/dashboard${route.link}`} key={route.link}>
                  <a
                    className={`inline-flex items-center gap-3 py-3 px-5 lg:px-7 hover:bg-gray-400 hover:text-gray-800 transition duration-300 ease-in-out ${
                      router.pathname === `/dashboard${route.link}`
                        ? "bg-gray-400 text-gray-800"
                        : "text-gray-200"
                    }`}
                  >
                    <div>{route.icon}</div>
                    <p>{route.name}</p>
                  </a>
                </Link>
          ))}
            <button  className={`inline-flex items-center text-gray-200 gap-3 py-3 px-6 hover:bg-brand-red hover:text-gray-100 transition duration-300 ease-in-out`} 
            onClick={()=> {
              userNotificationSuccess("Logging You Out...")
                setTimeout(() => {
                  dispatch(logOutSuccess())
                }, 1000)
            }}>
                <FaPowerOff />
                <p>Log Out</p>
            </button>
        </div>

        <div className="flex justify-between md:hidden px-2 py-1">
          <a className="inline-flex items-center">
            <Image
              src="/images/logo.png"
              alt="Bible Star TV Logo"
              height={47}
              width={42}
            />
          </a>
          <button
            className="text-2xl text-white"
            onClick={() => {
              setMobileMenu(true);
              // console.log("Clicked");
            }}
          >
            <AiOutlineMenu />
          </button>
        </div>
      </aside>

      {mobileMenu && (
        <>
          <div className="md:hidden h-full w-full fixed top-0 left-0 z-[3]">
            <div
              className="md:hidden h-full w-full bg-black opacity-50 z-[4]"
              onClick={() => setMobileMenu(false)}
            ></div>
            <div
              className="md:hidden fixed top-0 left-0 z-[5] bg-white h-full opacity-100 shadow flex flex-col text-lg py-5 px-3"
              style={{ width: "calc(100% - 70px)" }}
            >
              <div className="flex justify-end">
                <button
                  className="text-lg top-2 rounded-full bg-brand-red text-white p-2"
                  onClick={() => setMobileMenu(false)}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <div className="flex flex-col divide-y">
                {dashboardRoutes.map((route) => (
                  <Link href={`/dashboard${route.link}`} key={route.name}>
                    <a className="inline-flex items-center gap-7 text-lg sm:text-xl py-4 hover:text-brand-red">
                      {route.icon}
                      <span>{route.name}</span>
                    </a>
                  </Link>
                ))}
                <button className="inline-flex items-center gap-7 text-lg sm:text-xl py-4 hover:text-brand-red">
                  <FaPowerOff />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DashboardSidebar;
