import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { Table, Button, Space, Modal, Skeleton } from "antd";
import { connect, useDispatch } from "react-redux";

function PostUpdateModal({auth, currentPostData, preview, setPreview}) {
  return (
    <div>
      <Modal
        title={"Update or Delete Post"}
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
        <p>{postsData[current].title}</p>
        <p>{postsData[current].author}</p>
        <p>{postsData[current].category}</p>
        <p>{postsData[current].date}</p>
      </Modal>
    </div>
  );
}


const mapStateToProps = (state) => {
    return state;
  };
  
  export default connect(mapStateToProps)(PostUpdateModal);