import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { connect, useDispatch } from "react-redux";
import { Form, Input, Button, Select } from "antd";
import {
  FaPencilAlt,
  FaUser,
  FaQuestionCircle,
  FaCircleNotch
} from "react-icons/fa";
import axios from "axios";
import { baseUrl } from "../../../server/index";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../../functions/notification";
import SuperAuthLayout from "../../../components/layouts/SuperAuthLayout";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

const { Option } = Select;

function UserAdminAdd({ auth }) {
  const router = useRouter()
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Users",
      link: "/dashboard/users"
    },
    {
      name: "Add Admin"
    }
  ];

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    values.user_role = "admin"
    console.log("Success:", values);


    setLoading(true);
    axios.post(`${baseUrl}/auth/signup`, values)
    .then(res => {
      // console.log(res)
      setLoading(false)
      navigator.clipboard.writeText(`Email: ${values.email}; Password: ${values.password}`).then(() => {
        // clipboard successfully set
      console.log('success');
      userNotificationSuccess("Admin User Created", "Details copied to clipboard")
      setTimeout(() => {
        router.push("/dashboard/users")
      }, 300);
      
      }, () => {
        // clipboard write failed
        console.log('Failed to copy');
      });
    })
    .catch(err => {
      // console.log(err)
      setLoading(false)
      const errors = err.response.data.errors
      // console.log(errors)
      userNotificationFailure("Unable to create User", errors[Object.keys(errors)[0]])
    })
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <SuperAuthLayout>
      <DashboardLayout title="Add Admin" breadcrumb={breadCrumbData}>
        <div className="max-w-[1000px] mx-auto pt-5 pb-10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold">Add New Admin</h1>
          </div>

          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col md:flex-row gap-5">
              <Form.Item
                // onChange={(e) => setEmail(e.target.value)}
                label="Firstname"
                name="firstname"
                className="w-full" 
                rules={[
                  {
                    required: true,
                    message: "Please input the firstname"
                  }
                ]}
              >
                <Input size="large" placeholder="John"/>
              </Form.Item>

              <Form.Item
                // onChange={(e) => setEmail(e.target.value)}
                label="Lastname"
                name="lastname"
                className="w-full" 
                rules={[
                  {
                    required: true,
                    message: "Please input your lastname"
                  }
                ]}
              >
                <Input size="large" placeholder="Doe" />
              </Form.Item>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <Form.Item
                // onChange={(e) => setEmail(e.target.value)}
                label="Username"
                name="username"
                className="w-full" 
                rules={[
                  {
                    required: true,
                    message: "Please input the username"
                  }
                ]}
              >
                <Input size="large"/>
              </Form.Item>

              <Form.Item
                // onChange={(e) => setEmail(e.target.value)}
                label="Gender"
                name="gender"
                className="w-full" 
                rules={[
                  {
                    required: true,
                    message: "Please input the user's gender"
                  }
                ]}
              >
                <Select placeholder="Select user's gender" size="large">
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
              </Form.Item>
            </div>

            <div className="flex flex-col-reverse md:flex-row-reverse gap-5">
              <Form.Item
                // onChange={(e) => setEmail(e.target.value)}
                label="Password"
                name="password"
                className="w-full" 
                rules={[
                  {
                    required: true,
                    message: "Please input the password"
                  }
                ]}
              >
                <Input.Password size="large"/>
              </Form.Item>

              <Form.Item
                // onChange={(e) => setEmail(e.target.value)}
                label="Email Address"
                name="email"
                className="w-full" 
                rules={[
                  {
                    required: true,
                    message: "Please input your email address"
                  }
                ]}
              >
                <Input size="large"/>
              </Form.Item>
            </div>

            
            <Form.Item
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,
              // }}
              className=""
            >
              {!loading && (
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-blue-700 w-full"
                >
                  Create Admin User
                </Button>
              )}
              {loading && (
                <div className="w-full bg-blue-700 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                  <span>Creating Admin User...</span>{" "}
                  <FaCircleNotch className="animate-spin" />
                </div>
              )}
            </Form.Item>
          </Form>
        </div>
      </DashboardLayout>
    </SuperAuthLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(UserAdminAdd);
