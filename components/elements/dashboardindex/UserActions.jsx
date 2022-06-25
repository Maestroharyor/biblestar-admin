import Link from "next/link";
import {
  FaImage,
  FaClipboardList,
  FaClipboard,
  FaEnvelopeOpenText,
  FaPowerOff,
  FaUsers,
  FaPencilAlt,
  FaQuestionCircle
} from "react-icons/fa";
import { AiFillAppstore, AiFillSetting } from "react-icons/ai";
import { MdOutlineBarChart } from "react-icons/md";
import { connect, useDispatch } from "react-redux";
import { logOutSuccess } from "../../../store/auth/action";
import { userNotificationSuccess } from "../../../functions/notification";

function UserActions() {
  const dispatch = useDispatch()
  const actions = [
    // {
    //   name: "Manage HomePage Banners",
    //   icon: <FaImage />,
    //   link: "/dashboard/homepage",
    //   color: "bg-purple-500",
    //   // colorHover: "bg-purple-700",
    // },
    {
      name: "Manage Posts",
      icon: <FaClipboardList />,
      link: "/dashboard/posts",
      color: "bg-blue-700"
      // colorHover: "gray-900",
    },
    {
      name: "Create Post",
      icon: <FaPencilAlt />,
      link: "/dashboard/posts/create",
      color: "bg-gray-700"
      // colorHover: "gray-900",
    },
    {
      name: "Check Users",
      icon: <FaUsers />,
      link: "/dashboard/users",
      color: "bg-amber-700"
      // colorHover: "blue-900",
    },
    {
      name: "View Funds Reports",
      icon: <MdOutlineBarChart />,
      link: "/dashboard/reports",
      color: "bg-lime-700"
      // colorHover: "blue-900",
    },
    {
      name: "Manage Questions",
      icon: <FaQuestionCircle />,
      link: "/dashboard/questions",
      color: "bg-green-700"
      // colorHover: "black",
    },
    {
      name: "My Account Settings",
      icon: <AiFillSetting />,
      link: "/dashboard/account/settings",
      color: "bg-stone-700"
      // colorHover: "black",
    }
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pt-10 pb-16">
      {actions.map((action) => (
        <Link href={action.link} key={action.name}>
          <a
            className={`block ${action.color} rounded p-5 text-white text-center flex flex-col items-center justify-center gap-3 transform hover:scale-110 hover:text-white transition ease-in-out duration-300 shadow-xl`}
          >
            <div className="text-5xl">{action.icon}</div>
            <p className="text-lg font-medium">{action.name}</p>
          </a>
        </Link>
      ))}
      <button
        className={`block bg-red-600 rounded p-5 text-white  text-center flex flex-col items-center justify-center gap-3 hover:bg-red-700 transform hover:scale-110 hover:text-white transition ease-in-out duration-300 shadow-xl`}
        onClick={() => {
          userNotificationSuccess("Logging You Out...");
          setTimeout(() => {
            dispatch(logOutSuccess());
          }, 1000);
        }}
      >
        <div className="text-5xl">
          <FaPowerOff />
        </div>
        <p className="text-lg font-medium">Log Out</p>
      </button>
    </div>
  );
}

export default UserActions;
