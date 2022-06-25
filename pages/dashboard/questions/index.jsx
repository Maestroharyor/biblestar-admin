import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Form, Input, Skeleton, Modal, Button, Select } from "antd";
import { FaQuestionCircle, FaCircleNotch } from "react-icons/fa";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../../functions/notification";
import { booksOfBible } from "../../../data/books.json";

const { Option } = Select;

function QuestionsIndex({ auth, books }) {
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Questions"
    }
  ];

 

  // console.log(options);

  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [questionData, setQuestionData] = useState([]);
  const [questionBooks, setQuestionBooks] = useState([]);
  const [current, setCurrent] = useState(null);
  const [preview, setPreview] = useState(false);
  const [book, setBook] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const getMoreQuestion = async () => {
    const newQuestions = await axios.get(
      `${baseUrl}/auditions?page=${currentPage}&book=${book}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }
    );

    console.log(newQuestions);

    setQuestionData((postData) => [...postData, ...newQuestions.data.query]);
    setCurrentPage(currentPage + 1);
    if (newQuestions.data.has_next_page === false) {
      setHasMore(false);
    }
    // setLoading(false);
  };

  const getQuestions = async (value = book) => {
    setLoading(true);
    // setHasMore(true)
    const [books, auditions] = await Promise.allSettled([
      axios.get(`${baseUrl}/auditions/books`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      }),
      axios.get(`${baseUrl}/auditions?book=${value}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
    ]);

    console.log(books)
    console.log(auditions)

    setQuestionData(auditions.value.data.query)
    setQuestionBooks(books.value.data.data)
    
    
    setLoading(false)


    // .then((res) => {
    //   // console.log(res.data.query);
    //   setQuestionData(res.data.query);
    //   setLoading(false);
    // })
    // .catch((err) => {
    //   // console.log(err);
    //   setLoading(false);

    // });
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const updatePost = (values) => {
    // console.log("Success:", values);
    if (values.question === undefined) {
      values.question = questionData[current].question;
    }

    if (values.book_of_bible === undefined) {
      values.book_of_bible = questionData[current].book_of_bible;
    }
    if (values.answers === undefined) {
      values.answers = questionData[current].answers;
    }
    if (values.correct_answer === undefined) {
      values.correct_answer = questionData[current].correct_answer;
    }

    console.log("After:", values);

    setUpdateLoading(true);
    axios
      .put(`${baseUrl}/auditions/${questionData[current]._id}`, values, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      })
      .then((res) => {
        // console.log(res);
        // setQuestionData(res.data.query);
        setUpdateLoading(false);
        userNotificationSuccess(res.data.message);
        setCurrent(null);
        setPreview(false);
        getQuestions();
      })
      .catch((err) => {
        // console.log({ err });
        setUpdateLoading(false);
        userNotificationFailure(
          "Error Updating Question",
          err.response.data.message
        );
      });
  };

  const deleteQuestion = async () => {
    let userPrompt = confirm("Are you sure you want to delete this question?");
    // console.log(userPrompt);
    if (userPrompt) {
      setDeleteLoading(true);
      axios
        .delete(`${baseUrl}/auditions/${questionData[current]._id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })
        .then((res) => {
          // console.log(res);
          // setQuestionData(res.data.query);
          setDeleteLoading(false);
          userNotificationSuccess(res.data.message);
          setCurrent(null);
          setPreview(false);
          getQuestions();
        })
        .catch((err) => {
          // console.log({ err });
          setDeleteLoading(false);
          userNotificationFailure(
            "Error Updating Question",
            err.response.data.message
          );
        });
    } else {
      setPreview(false);
      setCurrent(null);
    }
  };

  const onFinishFailed = (errorInfo) => {
    // console.log("Failed:", errorInfo);
    userNotificationFailure(
      `${Capitalize(errorInfo.errorFields[0].name[0])} error`,
      errorInfo.errorFields[0].errors[0]
    );
  };

  // useEffect(() => {
  //   console.log(questionData[current]);
  // }, [current]);

  const options = [
    <Option key={"default"} value={""}>
      All
    </Option>
  ];

  const updateOptions = [];
  // console.log(books);
  questionBooks.map((book) => {
    options.push(
      <Option key={book} value={book}>
        {Capitalize(book)}
      </Option>
    );

    return options;
  });

  questionBooks.map((book) => {
    updateOptions.push(
      <Option key={book} value={book}>
        {Capitalize(book)}
      </Option>
    );

    return updateOptions;
  });

  return (
    <DashboardLayout title="Audition Questions" breadcrumb={breadCrumbData}>
      <div className="flex mt-7">
        <Link href={"/dashboard/questions/add-new"}>
          <a className="block bg-green-500 rounded py-2 px-5 hover:bg-green-700 text-white hover:text-white inline-flex gap-3 items-center text-lg transition duration-300 ease-in-out">
            <span>Add Questions</span> <FaQuestionCircle />
          </a>
        </Link>
      </div>
      <div className="flex flex-col divide-y mt-5">
        {loading && (
          <div className="bg-white px-5 pb-10">
            <Skeleton active className="py-5" />
            <Skeleton active className="py-5" />
            <Skeleton active className="py-5" />
          </div>
        )}
        {!loading && (
          <>
            <Select
              className="mb-5"
              size="large"
              defaultValue={book}
              // placeholder="Sort by Books of the bible"
              onChange={(value) => {
                // console.log(value);
                setBook(value);
                setHasMore(true);
                getQuestions(value);
              }}
            >
              {options}
            </Select>
            <div className="bg-gray-50/50 px-4 py-3 text-lg grid grid-cols-1 lg:grid-cols-4">
              <p className="lg:col-span-3 pr-2 font-bold">Question</p>
              <p>Book of Bible</p>
            </div>

            <InfiniteScroll
              dataLength={questionData.length}
              next={getMoreQuestion}
              hasMore={hasMore}
              scrollThreshold={"50%"}
              loader={
                <div className="bg-white px-5 pb-10">
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                </div>
              }
              className="flex flex-col divide-y bg-white"
              endMessage={
                <h4 className="px-4 py-3 text-lg">No more questions to show</h4>
              }
            >
              {questionData.map((question, index) => (
                <div
                  key={question._id}
                  className="bg-white px-4 py-3 text-lg grid grid-cols-1 lg:grid-cols-4"
                >
                  <p
                    className="lg:col-span-3 pr-2 cursor-pointer text-blue-500 font-bold"
                    onClick={() => {
                      setCurrent(index);
                      // console.log(index)
                      //                       setTimeout(()=> {
                      // console.log(questionData[current])
                      //                       }, 1)

                      setPreview(true);
                    }}
                  >
                    {Capitalize(question.question)}
                  </p>
                  <p>{Capitalize(question.book_of_bible)}</p>
                </div>
              ))}
            </InfiniteScroll>
          </>
        )}

        {current !== null && preview && (
          <Modal
            title={"Update or Delete Questions"}
            visible={preview}
            width={"100%"}
            height={"100%"}
            keyboard={false}
            maskClosable={false}
            // onOk={handleOk}
            onCancel={() => {
              setPreview(false);
            }}
            footer={null}
          >
            <div className="mx-auto w-full px-5 py-10">
              <Form
                name="basic"
                initialValues={{
                  remember: true
                }}
                onFinish={updatePost}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="flex flex-col gap-4"
              >
                <Form.Item
                  // onChange={(e) => setEmail(e.target.value)}
                  label="Question"
                  name="question"
                >
                  <Input
                    size="large"
                    defaultValue={Capitalize(questionData[current].question)}
                  />
                </Form.Item>

                <Form.Item
                  name="book_of_bible"
                  label="Book of the Bible"
                  // rules={[{ required: true }]}
                >
                  <Select
                    size="large"
                    placeholder="Select a option and change input text above"
                    defaultValue={questionData[current].book_of_bible}
                  >
                    {updateOptions}
                  </Select>
                </Form.Item>

                <Form.Item
                  name="answers"
                  label="Answers"
                  // rules={[{ required: true }]}
                >
                  <Select
                    size="large"
                    placeholder="Select a option and change input text above"
                    mode="multiple"
                    defaultValue={questionData[current].answers}
                  >
                    <Option value={questionData[current].answers[0]}>
                      {questionData[current].answers[0]}
                    </Option>
                    <Option value={questionData[current].answers[1]}>
                      {questionData[current].answers[1]}
                    </Option>
                    <Option value={questionData[current].answers[2]}>
                      {questionData[current].answers[2]}
                    </Option>
                    <Option value={questionData[current].answers[3]}>
                      {questionData[current].answers[3]}
                    </Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Correct Answer"
                  name="correct_answer"
                  // onChange={(e) => setEmail(e.target.value)}
                >
                  <Input
                    size="large"
                    defaultValue={Capitalize(
                      questionData[current].correct_answer
                    )}
                  />
                </Form.Item>

                <Form.Item
                  // wrapperCol={{
                  //   offset: 8,
                  //   span: 16,
                  // }}
                  className="flex justify-between"
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-5">
                    {!updateLoading && !deleteLoading && (
                      <Button
                        type="primary"
                        htmlType="submit"
                        size="large"
                        className="bg-blue-700 w-full"
                      >
                        Update Questions
                      </Button>
                    )}
                    {updateLoading && (
                      <div className="w-full bg-blue-700 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                        <span>Updating Question...</span>{" "}
                        <FaCircleNotch className="animate-spin" />
                      </div>
                    )}
                    {!updateLoading && !deleteLoading && (
                      <button
                        className="bg-red-600 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold"
                        onClick={deleteQuestion}
                      >
                        Delete
                      </button>
                    )}

                    {deleteLoading && (
                      <div
                        className="bg-red-600 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold opacity-60 cursor-progress w-full gap-4"
                        onClick={deleteQuestion}
                      >
                        <span>Deleting Question...</span>
                        <FaCircleNotch className="animate-spin" />
                      </div>
                    )}
                  </div>
                </Form.Item>
              </Form>
            </div>
          </Modal>
        )}
      </div>
    </DashboardLayout>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(QuestionsIndex);
