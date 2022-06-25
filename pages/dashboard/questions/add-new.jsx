import { useState, useEffect } from "react";
import {useRouter} from 'next/router';
import Link from "next/link";
import { Form, Input, Skeleton, Button, Select } from "antd";
import { FaQuestionCircle, FaCircleNotch, FaPencilAlt } from "react-icons/fa";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../../functions/notification";
import { booksOfBible } from "../../../data/books.json";
import DashboardLayout from "../../../components/layouts/DashboardLayout";

const { Option } = Select;

function QuestionsCreate({ auth }) {
  const router = useRouter()
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Questions",
      link: "/dashboard/questions"
    },
    {
      name: "Add New"
    }
  ];
  const options = [];
  booksOfBible.map((book) => {
    options.push(
      <Option key={book} value={book}>
        {Capitalize(book)}
      </Option>
    );

    return options;
  });

  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    // console.log("Success:", values);
    values.answers = values.answers.toLowerCase().split(",")
    values.correct_answer = values.correct_answer.toLowerCase()
    values.book_of_bible = values.book_of_bible.toLowerCase()
    values.question = values.question.toLowerCase()
    console.log(values)

    setLoading(true)
    axios
    .post(`${baseUrl}/auditions/questions`, values, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    .then((res) => {
      // console.log(res);
      // setQuestionData(res.data.query);
      setLoading(false);
      userNotificationSuccess(res.data.message)
      router.push("/dashboard/questions")
    })
    .catch((err) => {
      // console.log({err});
      setLoading(false);
      userNotificationFailure("Error Creating Question", err.response.data.message)
    });


  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <DashboardLayout title="Add Questions" breadcrumb={breadCrumbData}>
      <div className="max-w-[1000px] mx-auto py-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">Add New Questions</h1>
        </div>
        <Form
          name="basic"
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          className="flex flex-col gap-4"
        >
          <Form.Item
            // onChange={(e) => setEmail(e.target.value)}
            label="Question"
            name="question"
          >
            <Input size="large" placeholder="Add question here" />
          </Form.Item>

          <Form.Item
            name="book_of_bible"
            label="Book of the Bible"
            // rules={[{ required: true }]}
          >
            <Select
              size="large"
              placeholder="Select a book"
              // onSearch={onSearch}
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {options}
            </Select>
          </Form.Item>

          <Form.Item
            name="answers"
            label="Answers"
            // rules={[{ required: true }]}
          >
            <Input size="large" placeholder="Seperate answers by comma," />
          </Form.Item>
          <Form.Item
            label="Correct Answer"
            name="correct_answer"
            // onChange={(e) => setEmail(e.target.value)}
          >
            <Input
              size="large"
              placeholder="Add Correct answer here"
            />
          </Form.Item>

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
                Publish Questions
              </Button>
            )}
            {loading && (
              <div className="w-full bg-blue-700 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                <span>Publishing Question...</span>{" "}
                <FaCircleNotch className="animate-spin" />
              </div>
            )}
          </Form.Item>
        </Form>
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(QuestionsCreate);
