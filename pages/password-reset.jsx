import Image from "next/image";
import Link from "next/link";
import DefaultLayout from "../components/layouts/DefaultLayout";
import { Form, Input, Button, Checkbox } from "antd";

function PasswordReset() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <DefaultLayout>
      <div className="bg-gray-100 py-10 h-full flex items-center justify-center">
        <div className="max-w-[800px] mx-auto rounded shadow-lg">
          <div className="py-8 px-3 md:px-10 bg-white rounded w-full rounded">
            <div className="my-8 text-center">
              <div className="animate-bounce">
                <Link href="/">
                  <a className="block">
                    <Image
                      src="/images/logo.png"
                      alt="Bible Star TV Logo"
                      height={97}
                      width={92}
                    />
                  </a>
                </Link>
              </div>

              <h1 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">
                Forgot Your Password?
              </h1>
              <p className="text-lg text-gray-600">
                Enter your email address to recover password...
              </p>
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
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              className="flex flex-col gap-4"
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    type: "email",
                    message: "Please input your email!",
                  },
                ]}
              >
                <Input size="large" />
              </Form.Item>

              <Form.Item
              // wrapperCol={{
              //   offset: 8,
              //   span: 16,
              // }}
              >
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  className="bg-blue-700 w-full"
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
}

export default PasswordReset;
