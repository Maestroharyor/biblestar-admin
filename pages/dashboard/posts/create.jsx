import React, { useState, useEffect } from "react";
import {useRouter} from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import {baseUrl} from "../../../server/index";
import DashboardLayout from "../../../components/layouts/DashboardLayout";
import { Form, Input, Button, Checkbox } from "antd";
import { FaPencilAlt, FaCircleNotch } from "react-icons/fa";
import { notification, Select, Upload, Modal, message, Image } from "antd";
import { BiImageAdd } from "react-icons/bi";
import { IKImage, IKContext, IKUpload } from "imagekitio-react";
const QuillEditorComponent = dynamic(() =>
  import("../../../components/editor/QuillEditor"),
  { ssr: false }
);
import {
  userNotificationSuccess,
  userNotificationFailure
} from "../../../functions/notification";
import { Capitalize } from "../../../functions/utilities";



const { Dragger } = Upload;

function PostCreate({auth}) {
  const router = useRouter()
  const breadCrumbData = [
    {
      name: "Dashboard",
      link: "/dashboard"
    },
    {
      name: "Posts",
      link: "/dashboard/posts"
    },
    {
      name: "Create Post"
    }
  ];

  const [title, setTitle] = useState("");
  const [featured_image, setFeaturedImage] = useState("");
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState("");
  // const [featuredImageLoading, setFeaturedImageLoading] = useState(fa);
  const [featured_image_thumbnail, setFeaturedImageThumbnail] = useState("");
  const [fileID, setFileID] = useState("");
  const [postData, setPostData] = useState("");

  const createPost = () => {
    const postModel = {
      title,
      category: category.toLowerCase().split(","),
      featured_image: {
        url: featured_image,
        thumbnail: featured_image_thumbnail,
        fileID
      },
      body: postData
    }

    console.log(postModel)
    setLoading(true)
    axios.post(`${baseUrl}/blogs`, postModel, {
      headers: {
        Authorization: `Bearer ${auth.token}`
      }
    })
    .then(response => {
      console.log(response)
      userNotificationSuccess("Post Created Successfully")
      setLoading(false)
      router.push("/dashboard/posts")
    })
    .catch(error => {
      console.log({error})
      error.response !== undefined ? userNotificationFailure(Capitalize(error.response.data.message)) : userNotificationFailure("An error occured while publishing your post")
      setLoading(false)
    })
  };

  const deleteFeaturedImage = async () =>{
    axios.delete(`${baseUrl}/uploads/${fileID}`, {headers: {
      Authorization: `Bearer ${auth.token}`
    }})
    .then(response => {
      console.log(response)
      userNotificationSuccess(response.data.message)
      setFeaturedImage("")
      setFeaturedImageThumbnail("")
      setFileID("")
    })
    .catch(error => {
      console.log({error})
      error.response.data.error ? userNotificationFailure(error.response.data.error) : userNotificationFailure("An error occured while deleting image")
    })
  }

  return (
    <>
    {loading && (
        <div className="bg-black fixed z-[1000] w-full h-full flex flex-col gap-4 items-center justify-center text-6xl text-brand-red opacity-95 lg:mr-10">
          <FaCircleNotch className="animate-spin" />
          <p className="text-2xl text-white">Creating Post...</p>
        </div>
      )}
    <DashboardLayout title="Create a Posts" breadcrumb={breadCrumbData}>
      <div>
        <div className="mb-5 ">
          <h1 className="text-4xl font-bold">Create Posts</h1>
        </div>
        <div className=" pb-10">
          <IKContext
            publicKey="public_e5cs35YbhlFkCwLY3xvugmZSkXs="
            urlEndpoint="https://ik.imagekit.io/jwjlkphqy5y"
            transformationPosition="path"
            authenticationEndpoint={`${baseUrl}/uploads/auth`}
          >
            
            {!featured_image && (
              <div className="mt-5 mb-10">
                <p className="mb-3 text-2xl font-bold text-brand-red">Upload Featured Image</p>
              <IKUpload
                // fileName="file-name.jpg"
                className="mb-5"
                folder={"/bible-stars/featured-images"}
                onError={(error) => {
                  console.log({ error });
                  userNotificationFailure(`Image upload failed: ${error.message} `)
                }}
                onSuccess={(response) => {
                  userNotificationSuccess("Featured Image Uploaded Successfully")
                  console.log({ response });
                  setFeaturedImage(response.url);
                  setFeaturedImageThumbnail(response.thumbnailUrl);
                  setFileID(response.fileId);
                }}
              />
              </div>
            )}
            {featured_image && (
              <Image alt="" src={featured_image} height={300} />
            )}
            {featured_image && <div className="mt-3 mb-10">
              <button className="px-5 py-2 rounded bg-brand-red hover:bg-red-800 transition ease-in-out duration-300 text-white" onClick={() => {
                // console.log(`https://api.imagekit.io/v1/files/${fileID}`)
                deleteFeaturedImage()
                // setFeaturedImage("")
                // setFeaturedImageThumbnail("")
              }}>Delete Image</button>
              </div>}
          </IKContext>
          <div className="mb-10">
          <p className="mb-3 text-2xl font-bold text-brand-red">Post Title:</p>
              <input className="w-full px-5 py-3 ring ring-gray-300 text-xl" placeholder="Post title here..." onChange={e => setTitle(e.target.value)} />
          </div>
          <div className="mb-10">
          <p className="mb-3 text-2xl font-bold text-brand-red">Categories:</p>
          <p className="mb-2 text-sm font-bold italic text-gray-500">Separate categories with a comma , ....</p>
              <input className="w-full px-5 py-2 ring ring-gray-300 text-lg" placeholder="Separate categories with a comma , ...." onChange={e => setCategory(e.target.value)} />
          </div>
          <div>
            <QuillEditorComponent
              postData={postData}
              setPostData={setPostData}
            />
          </div>
          <div className="flex justify-end mt-5">
            <button
              className="block bg-green-500 rounded py-2 px-10 hover:bg-green-700 text-white hover:text-white inline-flex gap-3 items-center text-lg transition duration-300 ease-in-out"
              onClick={createPost}
            >
              <span>Publish Post</span>
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
    </>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(PostCreate);
