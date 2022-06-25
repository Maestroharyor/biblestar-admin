import React, { useState, useEffect } from "react";
import Link from "next/link";
import { connect, useDispatch } from "react-redux";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Form, Input, Button, Checkbox } from "antd";
import { FaPencilAlt, FaUser } from "react-icons/fa";
import SusbcriberList from "../../../components/elements/user/SubscriberList";

function SubscriberIndex({auth}) {
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Subscribers",
    },
  ];

  return (
    <DashboardLayout title="Users" breadcrumb={breadCrumbData}>
      <div>
        <div className="mb-5 ">
          <h1 className="text-4xl font-bold">Newsletter</h1>
        </div>
        <div className="py-10">
            <SusbcriberList />
        </div>
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(SubscriberIndex);