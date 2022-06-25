import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import { Avatar } from "antd";
import { FaPencilAlt } from "react-icons/fa";
import { Capitalize } from "../../../functions/utilities";

function UserProfileCard({ auth }) {
  return (
    <>
      <div className="bg-blue-700 shadow rounded px-2 pt-4 py-8 text-white text-lg sticky top-5">
        <p className="text-sm mb-4">User Profile</p>
        <div className="flex flex-col gap-1 items-center">
          <div className="relative mb-4">
            <Avatar size={150} className="me-2 bg-gray-800 text-3xl">
              {auth.firstname[0].toUpperCase()}
            </Avatar>
            <Link href={"/dashboard/account"} passHref>
              <a className="absolute bottom-0 -left-1 hover:text-gray-300">
                <FaPencilAlt />
              </a>
            </Link>
          </div>
          <p className="text-center font-bold">{`${Capitalize(
            auth.firstname
          )} ${Capitalize(auth.lastname)}`}</p>
          <p>Email: {auth.email}</p>
          {auth.gender && <p>Gender: {Capitalize(auth.gender)}</p>}
        </div>
      </div>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(UserProfileCard);
