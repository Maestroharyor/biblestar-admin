import { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Skeleton } from "antd";
import axios from "axios";
import moment from "moment";
import { Select } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { connect, useDispatch } from "react-redux";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";
import {
  userNotificationFailure,
  userNotificationSuccess,
} from "../../../functions/notification";

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
      `${baseUrl}/subscribers?page=${currentPage}`
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
      .get(`${baseUrl}/subscribers`)
      .then((res) => {
        // console.log(res.data.query);
        setPostData(res.data.query);
        setLoading(false);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, []);

 
  return (
    <>
      <>
        <div>
            <div className="flex flex-col divide-y">
              <div className="grid grid-cols-4 md:grid-cols-12 bg-gray-200 divide py-3 px-4 text-xl font-medium gap-5">
                <p className="pr-2 cursor-pointer font-bold md:col-span-5">
                  Name
                </p>
                {/* <p>Status</p> */}
                <p className="hidden md:block md:col-span-2">Location</p>
                <p className="hidden md:block md:col-span-3">Email Address</p>
              </div>
              {loading && (
                <div className="bg-white px-5 pb-10">
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                  <Skeleton active className="py-5" />
                </div>
              )}
              {!loading && (
                <InfiniteScroll
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
                  endMessage={
                    <h4 className="px-4 py-3 text-lg">
                      No more subscriber to show
                    </h4>
                  }
                >
                  {postData.map((data, index) => (
                    <div
                      className="grid grid-cols-4 md:grid-cols-12 bg-white px-4 py-3 text-lg gap-5 border-b-2 border-gray-100"
                      key={data._id}
                    >
                      <p
                        className="pr-2  text-blue-500 font-bold md:col-span-5"
                        // onClick={() => {
                        //   setCurrent(index);
                        //   setPreview(true);
                        //   console.log(postData[index]);
                        // }}
                      >
                        {`${Capitalize(data.name)}`}
                      </p>

                      {/* <p>{data.status}</p> */}
                      <p className="hidden md:block md:col-span-2">
                        {data.location ? Capitalize(data.location) :  ""}
                      </p>
                      <p className="hidden md:block md:col-span-3">
                        {data.email}
                      </p>
                    </div>
                  ))}
                </InfiniteScroll>
              )}
            </div>
        </div>
      </>
    </>
  );
}

export default UserList;
