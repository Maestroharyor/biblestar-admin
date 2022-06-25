import React, { useState, useEffect } from "react";
import { Skeleton, Modal, Select, Tooltip } from "antd";
import { FaCircleNotch, FaEdit, } from "react-icons/fa";
import axios from "axios";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import {
  userNotificationSuccess,
  userNotificationFailure,
} from "../../../functions/notification";



function HomeplayIndex({ auth }) {
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard",
    },
    {
      name: "Homeplay",
    },
  ];

  // console.log(options);

  const [newQuestion, setNewQuestion] = useState("");
  const [newCorrectAnswers, setNewCorrectAnswers] = useState("");
  const [newWrongAnswers, setNewWrongAnswers] = useState("");
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [homePlayData, setHomePlayData] = useState([]);
  const [preview, setPreview] = useState(false);

  const getHomePlays = async () => {
    setLoading(true);
    const homePlays = await axios.get(`${baseUrl}/homeplays`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    });

    setHomePlayData(homePlays.data.query);
    setLoading(false);
  };

  useEffect(() => {
    getHomePlays();
  }, []);

  //   Update Question
  const updateQuestion = async (e) => {
    e.preventDefault();

    if (!newQuestion || !newCorrectAnswers || !newWrongAnswers) {
      !newQuestion &&
        userNotificationFailure("Please edit the question before updating");
      !newCorrectAnswers &&
        userNotificationFailure(
          "Please edit the right answers before updating"
        );
      !newWrongAnswers &&
        userNotificationFailure(
          "Please edit the wrong answers before updating"
        );
    } else {
      // console.log({newQuestion, newCorrectAnswers, newWrongAnswers})
      const homePlayUpdate = {
        question: newQuestion,
        correct_answers: newCorrectAnswers.split(","),
        wrong_answers: newWrongAnswers.split(","),
      };

      setUpdateLoading(true);
      axios
        .put(`${baseUrl}/homeplays/${homePlayData[0]._id}`, homePlayUpdate, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          // setQuestionData(res.data.query);
          setUpdateLoading(false);
          userNotificationSuccess(res.data.message);
          setPreview(false);
          getHomePlays();
        })
        .catch((err) => {
          // console.log({ err });
          setUpdateLoading(false);
          userNotificationFailure(
            "Error Updating Question",
            err.response.data.message
          );
        });
    }
    // console.log({newQuestion, newCorrectAnswers, newWrongAnswers})
  };

  return (
    <DashboardLayout title="Homeplay Question" breadcrumb={breadCrumbData}>
      <div className="mb-8 mt-5">
        <h1 className="text-4xl font-bold">Homeplay Question for the week</h1>
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
          <div className="">
            {homePlayData.map((homePlay, index) => (
              <div
                key={homePlay._id}
                className="bg-white px-4 py-4 text-xl flex justify-between items-center"
              >
                <p className="lg:col-span-3 pr-2 text-blue-500 font-bold">
                  {Capitalize(homePlay.question)}
                </p>
                <Tooltip title="Edit Homeplay">
                  <button
                    className="text-2xl font-bold text-gray-500"
                    onClick={() => {
                      setPreview(true);
                    }}
                  >
                    <FaEdit />
                  </button>
                </Tooltip>
              </div>
            ))}
          </div>
        )}
        {preview && (
          <Modal
            title={"Edit Homeplay question"}
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
            <div className="mx-auto w-full px-5 pb-20">
              <form className="flex flex-col gap-5" onSubmit={updateQuestion}>
                <div className="">
                  <label htmlFor="" className="text-2xl font-bold mb-2 block">
                    Question:
                  </label>
                  <textarea
                    className="border-2 w-full py-3 px-3 text-xl"
                    style={{ resize: "none" }}
                    onChange={(e) => setNewQuestion(e.target.value)}
                  >
                    {homePlayData[0].question}
                  </textarea>
                </div>
                <div className="">
                  <label htmlFor="" className="text-2xl font-bold mb-2 block">
                    Correct Answers:
                  </label>
                  <textarea
                    className="border-2 w-full py-2 px-3 text-xl h-[80px]"
                    style={{ resize: "none" }}
                    onChange={(e) => setNewCorrectAnswers(e.target.value)}
                  >
                    {homePlayData[0].correct_answers.join(",")}
                  </textarea>
                  <p className="text-sm italic">Separate answers with comma,</p>
                </div>
                <div className="">
                  <label htmlFor="" className="text-2xl font-bold mb-2 block">
                    Wrong Answers:
                  </label>
                  <textarea
                    className="border-2 w-full py-2 px-3 text-xl h-[80px]"
                    cols={"3"}
                    rows={"3"}
                    style={{ resize: "none" }}
                    onChange={(e) => setNewWrongAnswers(e.target.value)}
                  >
                    {homePlayData[0].wrong_answers.join(",")}
                  </textarea>
                  <p className="text-sm italic">Separate answers with comma,</p>
                </div>
                {!updateLoading && (
                  <button
                    className="w-full px-5 py-3 rounded bg-green-500 hover:bg-green-700 text-white text-2xl transition duration-300 ease-in-out"
                    type="Submit"
                  >
                    Update Homeplay
                  </button>
                )}
                {updateLoading && (
                  <div className="w-full bg-blue-700 py-2 px-3 inline-flex justify-center items-center text-white text-lg font-bold gap-4 opacity-60 cursor-progress">
                    <span>Updating Homeplay...</span>{" "}
                    <FaCircleNotch className="animate-spin" />
                  </div>
                )}
              </form>
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

export default connect(mapStateToProps)(HomeplayIndex);
