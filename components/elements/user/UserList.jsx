import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Skeleton } from "antd";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";
import { userNotificationFailure, userNotificationSuccess } from "../../../functions/notification";

const { Option } = Select;

function UserList() {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const [postData, setPostData] = useState([]);
  const [current, setCurrent] = useState(null);
  const [preview, setPreview] = useState(false);
  const [role, setRole] = useState("contestant");
  const [batch, setBatch] = useState("");
  const [hasMore, setHasMore] = useState(true);

  const getMorePost = async () => {
    const newPosts = await axios.get(
      `${baseUrl}/users?page=${currentPage}&role=${role}`
    );

    // console.log(newPosts);
    // console.log(blogsData);

    setPostData((postData) => [...postData, ...newPosts.data.query]);
    setCurrentPage(currentPage + 1);
    if (newPosts.data.has_next_page === false) {
      setHasMore(false);
    }
    // setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/users?role=${role}`)
      .then((res) => {
        console.log(res.data.query);
        setPostData(res.data.query);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const changeRole = async (value) => {
    setRole(value)
    console.log(value)
    setLoading(true);
    axios
      .get(`${baseUrl}/users?role=${value}`)
      .then((res) => {
        console.log(res.data.query);
        // setPostData(res.data.query);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  const changeBatch = async (value) => {
    // setBatch(value)
    setLoading(true);
    setHasMore(true)
    let query;
    if(value === ""){
      query = `${baseUrl}/users?role=${role}`
    } else{
      query = `${baseUrl}/users/batch/${value}`
    }
    axios
      .get(query)
      .then((res) => {
        console.log(res.data);
        if(!res.data.query){
          setPostData([]);
          userNotificationFailure(res.data.message)
          setHasMore(false)
        } else{
          setPostData(res.data.query)
        }
        
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <>
      <>
        <div>
          <div className="flex flex-col md:flex-row justify-between gap-10 mb-7">
          <Select className="w-full" size="large" onChange={changeRole} placeholder="User Role" defaultValue={role}>
            <Option value="contestant">Contestants</Option>
            <Option value="subscriber">Subscribers</Option>
            <Option value="admin">Admins</Option>
          </Select>

          {role === "contestant" && <Select className="w-full" size="large" placeholder="Select Batch" onChange={changeBatch}>
            <Option value="">All Batches</Option>
            <Option value="a">Batch A</Option>
            <Option value="b">Batch B</Option>
            <Option value="c">Batch C</Option>
            <Option value="d">Batch D</Option>
          </Select>}
          </div>
          

        
          {role === "contestant" && <div className="flex flex-col divide-y">
            <div className="grid grid-cols-4 md:grid-cols-12 bg-gray-200 divide py-3 px-4 text-xl font-medium gap-5">
              <p className="pr-2 cursor-pointer font-bold md:col-span-3">Name</p>
              <p className="hidden md:block col-span-2">Phone Number</p>
              <p className="">Total Points</p>
              <p className="">Amount Spent</p>
              <p className="hidden md:block md:col-span-2">Balance</p>
              <p className="hidden md:block">Batch</p>
              {/* <p>Status</p> */}
              <p className="hidden md:block md:col-span-2">Date Joined</p>
            </div>
            {loading && (
              <div className="bg-white px-5 pb-10">
                <Skeleton active className="py-5" />
                <Skeleton active className="py-5" />
                <Skeleton active className="py-5" />
              </div>
            )}
            {!loading && <InfiniteScroll
              dataLength={postData.length}
              next={getMorePost}
              hasMore={hasMore}
              scrollThreshold={"50%"}
              loader={
                <div className="bg-white px-5 pb-10 ">
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                </div>
              }
              className=""
              endMessage={<h4  className="px-4 py-3 text-lg">No more contestant to show</h4>}
            >
              {postData.map((data, index) => (
                <div
                  className="grid grid-cols-4 md:grid-cols-12 bg-white px-4 py-3 text-lg gap-5 border-b-2 border-gray-100"
                  key={data._id}
                >
                  <p
                    className="pr-2 text-blue-500 font-bold md:col-span-3"
                    // onClick={() => {
                    //   setCurrent(index);
                    //   setPreview(true);
                    //   console.log(postData[index]);
                    // }}
                  >
                    {`${Capitalize(data.firstname)} ${Capitalize(
                      data.lastname
                    )}`}
                  </p>
                  <p className="md:col-span-2">{data.phone_number ? data.phone_number : ""}</p>
                  <p className="">{data.my_stats.total_points}</p>
                  {/* <p className="hidden md:block md:col-span-2">
                    ₦
                    {new Intl.NumberFormat().format(data.my_stats.amount_spent)}
                  </p> */}
                  <p className="">
                    ₦
                    {new Intl.NumberFormat().format(data.my_stats.amount_spent)}
                  </p>
                  <p className="hidden md:block md:col-span-2">
                    ₦
                    {new Intl.NumberFormat().format(
                      data.my_stats.wallet_balance
                    )}
                  </p>
                  <p className="hidden md:block">{data.batch !== undefined ? data.batch : "" }</p>
                  {/* <p>{data.status}</p> */}
                  <p className="hidden md:block md:col-span-2">
                    {moment(data.createdAt).format("ddd, MMM D YYYY")}
                  </p>
                </div>
              ))}
            </InfiniteScroll>}
          </div>}

          {(role !== "contestant") && <div className="flex flex-col divide-y">
            <div className="grid grid-cols-4 md:grid-cols-12 bg-gray-200 divide py-3 px-4 text-xl font-medium gap-5">
              <p className="pr-2 cursor-pointer font-bold md:col-span-10">Name</p>
              {/* <p>Status</p> */}
              <p className="hidden md:block md:col-span-2">Date Joined</p>
            </div>
            {loading && (
              <div className="bg-white px-5 pb-10">
                <Skeleton active className="py-5" />
                <Skeleton active className="py-5" />
                <Skeleton active className="py-5" />
              </div>
            )}
            {!loading && <InfiniteScroll
              dataLength={postData.length}
              next={getMorePost}
              hasMore={hasMore}
              scrollThreshold={"50%"}
              loader={
                <div className="bg-white px-5 pb-10 ">
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                </div>
              }
              className=""
              endMessage={<h4  className="px-4 py-3 text-lg">No more contestant to show</h4>}
            >
              {postData.map((data, index) => (
                <div
                  className="grid grid-cols-4 md:grid-cols-12 bg-white px-4 py-3 text-lg gap-5 border-b-2 border-gray-100"
                  key={data._id}
                >
                  <p
                    className="pr-2  text-blue-500 font-bold md:col-span-10"
                    // onClick={() => {
                    //   setCurrent(index);
                    //   setPreview(true);
                    //   console.log(postData[index]);
                    // }}
                  >
                    {`${Capitalize(data.firstname)} ${Capitalize(
                      data.lastname
                    )}`}
                  </p>

                  {/* <p>{data.status}</p> */}
                  <p className="hidden md:block md:col-span-2">
                    {moment(data.createdAt).format("ddd, MMM D YYYY")}
                  </p>
                </div>
              ))}
            </InfiniteScroll>}
          </div>}
        </div>

        {/* {current !== null && (
          <Modal
            title={postData[current].name}
            visible={preview}
            width={1200}
            keyboard={false}
            maskClosable={false}
            // onOk={handleOk}
            onCancel={() => {
              setPreview(false);
            }}
            footer={null}
          >
            <p>{postData[current].name}</p>
            <p>{postData[current].amount_spent}</p>
            <p>{postData[current].date_joined}</p>
          </Modal>
        )} */}
      </>
    </>
  );
}

export default UserList;
