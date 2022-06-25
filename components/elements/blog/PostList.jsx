import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Button, Space, Modal, Skeleton } from "antd";
import { FaTrashAlt } from "react-icons/fa";
import { connect, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "../../../server/index";
import { Capitalize } from "../../../functions/utilities";
import PostUpdateModal from "../../partials/PostUpdateModal";
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../../functions/notification";

function PostList({ auth, deleteLoading, setDeleteLoading }) {
  const [loading, setLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(2);
  const [postsData, setPostsData] = useState([]);
  const [current, setCurrent] = useState(null);
  const [preview, setPreview] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    setLoading(true);
    const blogs = await axios.get(`${baseUrl}/blogs`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });
    console.log(blogs);
    setPostsData(blogs.data.query);
    setLoading(false);
  };

  const getMorePosts = async () => {
    const newPosts = await axios.get(`${baseUrl}/blogs?page=${currentPage}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    });

    console.log(newPosts);

    setPostsData((postData) => [...postData, ...newPosts.data.query]);
    setCurrentPage(currentPage + 1);
    if (newPosts.data.has_next_page === false) {
      setHasMore(false);
    }
    // setLoading(false);
  };

  useEffect(() => {
    getPosts();
  }, []);

  // console.log(postsData[current])
  const deletePost = async (post) => {
    // console.log(post);
    let userPrompt = confirm("Are you sure you want to delete this post?");
    // console.log(userPrompt);
    if (userPrompt) {
      setDeleteLoading(true);
      const [deleteImage, deletePost] = await Promise.allSettled([
        axios.delete(`${baseUrl}/uploads/${post.featured_image.fileID}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        }),
        axios.delete(`${baseUrl}/blogs/${post._id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })
      ]);

      if (deleteImage.value.status === 200 && deletePost.value.status === 200) {
        userNotificationSuccess(deletePost.value.data.message);
      } else {
        userNotificationFailure("An Error Occured", "Please try again later");
      }

      console.log(deleteImage);
      console.log(deletePost);
      getPosts()
      setDeleteLoading(false);
      // axios
      //   .delete(`${baseUrl}/auditions/${questionData[current]._id}`, {
      //     headers: {
      //       Authorization: `Bearer ${auth.token}`
      //     }
      //   })
      //   .then((res) => {
      //     // console.log(res);
      //     // setQuestionData(res.data.query);
      //     setDeleteLoading(false);
      //     userNotificationSuccess(res.data.message);
      //     setCurrent(null);
      //     setPreview(false);
      //     getQuestions();
      //   })
      //   .catch((err) => {
      //     // console.log({ err });
      //     setDeleteLoading(false);
      //     userNotificationFailure(
      //       "Error Updating Question",
      //       err.response.data.message
      //     );
      //   });
    } else {
      setCurrent(null);
    }
  };
  // console.log(auth.token)
  return (
    <>
      <div>
        <div className="flex flex-col divide-y">
          <div className="grid grid-cols-6 sm:grid-cols-12 bg-gray-200 divide py-3 px-4 text-xl font-medium">
            <p className="col-span-5 pr-2 cursor-pointer font-bold">
              Post Title
            </p>
            <p className="hidden lg:block col-span-2">Author</p>
            <p className="hidden sm:block col-span-2">Category</p>
            <p className="hidden sm:block col-span-2">Date Created</p>
            <p></p>
          </div>
          <InfiniteScroll
            dataLength={postsData.length}
            next={getMorePosts}
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
            {postsData.map((post, index) => (
              <div
                className="grid grid-cols-6 sm:grid-cols-12  bg-white px-4 py-3 text-lg"
                key={post._id}
              >
                <p
                  className="col-span-5 pr-2  text-gray-500 font-bold"
                  // onClick={() => {
                  //   setCurrent(index);
                  //   setPreview(true);
                  //   console.log(postsData[index]);
                  // }}
                >
                  {post.title ? Capitalize(post.title) : ""}
                </p>
                <p className="hidden lg:block col-span-2">
                  {post.created_by ? Capitalize(post.created_by.firstname) : ""}
                </p>
                <p className="hidden sm:block col-span-2">
                  {post.category ? Capitalize(post.category[0]) : ""}
                </p>
                <p className="hidden sm:block col-span-2">
                  {moment(post.createdAt).format("ddd, MMM D YYYY")}
                </p>
                <p
                  className="text-brand-red hover:text-red-700 transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => {
                    // setCurrent(index)
                    deletePost(postsData[index]);
                  }}
                >
                  <FaTrashAlt />
                </p>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>

      {/* {current !== null && (
        // <Modal
        // title={"Update or Delete Post"}
        // visible={preview}
        // width={"100%"}
        // height={"100%"}
        // keyboard={false}
        // maskClosable={false}
        // // onOk={handleOk}
        // onCancel={() => {
        //   setPreview(false);
        // }}
        // footer={null}
        // >
        //   <p>{postsData[current].title}</p>
        //   <p>{postsData[current].author}</p>
        //   <p>{postsData[current].category}</p>
        //   <p>{postsData[current].date}</p>
        // </Modal>
        <PostUpdateModal />
      )} */}
    </>
  );
}

// export default PostList;
const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PostList);
