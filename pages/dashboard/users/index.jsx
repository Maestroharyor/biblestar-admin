import React, { useState, useEffect } from "react";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Form, Input, Button, Checkbox } from "antd";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import UserList from "../../../components/elements/user/UserList";

function UserIndex({auth}) {
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Users",
    },
  ];

  return (
    <DashboardLayout title="Users" breadcrumb={breadCrumbData}>
      <div>
        <div className="mb-5 ">
          <h1 className="text-4xl font-bold">All Users</h1>
        </div>
        <div className="flex ">
          {auth.user_role === "superadmin" && <Link href={"/dashboard/users/add-admin"}>
            <a className="block bg-green-500 rounded py-2 px-5 hover:bg-green-700 text-white hover:text-white inline-flex gap-3 items-center text-lg transition duration-300 ease-in-out">
              <span>Add Admin User</span> <FaUser />
            </a>
          </Link>}
        </div>
        <div className="py-10">
            <UserList />
        </div>
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(UserIndex);