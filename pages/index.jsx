import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
// import Cookies from "universal-cookie";
import { connect, useDispatch } from "react-redux";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { Form, Input, Button, Checkbox } from "antd";
import { FaArrowAltCircleRight, FaCircleNotch } from "react-icons/fa";
import { loginSuccess } from "../store/auth/action";
import { baseUrl } from "../server/index";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../functions/notification";
import { Capitalize } from "../functions/utilities";

function Home(props) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  // console.log(props)

  const onFinish = (values) => {
    // console.log("Success:", values);
    setLoading(true);
    axios
      .post(`${baseUrl}/auth/login`, values)
      .then((res) => {
        setLoading(false);
        // console.log(res)
        const { data } = res;
        // console.log(data);
        if (!data.user_role.includes("admin")) {
          userNotificationFailure(
            "Access Denied",
            "Only admin users are allowed to proceed futher"
          );
        } else {
          dispatch(loginSuccess(data));
          userNotificationSuccess(
            "Login Successful",
            "Redirecting you to dashboard"
          );
          // console.log(props)
          router.push("/dashboard");
        }
      })
      .catch((err) => {
        setLoading(false);
        // console.log(err.response.data.errors);
        if (err.response.data) {
          const errTitle = Object.keys(err.response.data.errors)[0];
          userNotificationFailure(
            `${Capitalize(errTitle)} error`,
            err.response.data.errors[`${errTitle}`]
          );
        }

        // console.log(err.response.data.errors)
        // console.log(errors)
        // userNotificationFailure("An error occured while logging you in");
      });
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    userNotificationFailure(
      `${Capitalize(errorInfo.errorFields[0].name[0])} error`,
      errorInfo.errorFields[0].errors[0]
    );
  };
  return (
    <DefaultLayout>
      <div className="bg-gray-100 py-0 lg:py-20 flex items-center justify-center">
        <div className="max-w-[1000px] mx-auto rounded shadow-lg grid grid-cols-1 lg:grid-cols-2">
          <div className="py-8 px-8 lg:px-5 md:px-10 bg-white rounded-l">
            <div className="my-8 text-center">
              <div className="animate-bounce">
                <Image
                  src="/images/logo.png"
                  alt="Bible Star TV Logo"
                  height={97}
                  width={92}
                />
              </div>

              <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                Welcome to Bible Stars Admin Dashboard
              </h1>
              <p className="text-lg text-gray-600">Login to proceed...</p>
            </div>

            <Form
              name="basic"
              // labelCol={{
              //   span: 8,
              // }}
              // wrapperCol={{
              //   span: 16,
              // }}
              initialValues={{
                remember: true
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="flex flex-col gap-4"
            >
              <Form.Item
                label="Email"
                name="email"
                // onChange={(e) => setEmail(e.target.value)}
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!"
                  }
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                // onChange={(e) => setPassword(e.target.value)}
                rules={[
                  {
                    required: true,
                    message: "Please input your password!"
                  }
                ]}
              >
                <Input.Password size="large" />
              </Form.Item>

              <Form.Item
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,
              // }}
              >
                {!loading && (
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    className="bg-blue-700 w-full"
                  >
                    Submit
                  </Button>
                )}
                {loading && (
                  <div className="w-full bg-blue-700 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                    <span>Logging in..</span>{" "}
                    <FaCircleNotch className="animate-spin" />
                  </div>
                )}
              </Form.Item>
            </Form>
            {/* <div className="text-right">
              <Link href="/password-reset">
                <a className="text-gray-600 hover:text-blue-700">
                  Forgot Password?
                </a>
              </Link>
            </div> */}
          </div>
          <div className="py-8 px-3 bg-blue-700 rounded-r flex items-center justify-center hidden lg:block h-full">
            <div className="animate-pulse">
              <Image
                src="/images/singer.png"
                alt="Online Auditions"
                className=""
                height={389}
                width={469}
              />
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(Home);
