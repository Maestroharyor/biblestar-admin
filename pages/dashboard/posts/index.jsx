import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form, Input, Button, Checkbox } from "antd";
// import { FaPencilAlt } from "react-icons/fa";
import {FaPencilAlt, FaTrashAlt, FaCircleNotch} from 'react-icons/fa';
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import PostList from '../../../components/elements/blog/PostList'

function PostIndex() {
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Posts",
    },
  ];
  const [deleteLoading, setDeleteLoading] = useState(false);

  return (
    <>
            {deleteLoading && (
        <div className="bg-black fixed z-[1000] w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-brand-red opacity-95 lg:mr-10">
          <FaCircleNotch className="animate-spin" />
          <p className="text-2xl text-white">Deleting Post...</p>
        </div>
      )}
    <DashboardLayout title="Posts" breadcrumb={breadCrumbData}>
      <div>
        <div className="mb-5 ">
          <h1 className="text-4xl font-bold">Manage Posts</h1>
        </div>
        <div className="flex ">
          <Link href={"/dashboard/posts/create"}>
            <a className="block bg-green-500 rounded py-2 px-5 hover:bg-green-700 text-white hover:text-white inline-flex gap-3 items-center text-lg transition duration-300 ease-in-out">
              <span>Create Posts</span> <FaPencilAlt />
            </a>
          </Link>
        </div>
        <div className="py-10">
            <PostList deleteLoading={deleteLoading} setDeleteLoading={setDeleteLoading} />
        </div>
      </div>
    </DashboardLayout>
    </>
  );
}

export default PostIndex;
