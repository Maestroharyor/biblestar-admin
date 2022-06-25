import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({ postData, setPostData }) => {
  return (
    <ReactQuill
      value={postData}
      onChange={(value) => setPostData(value)}
    //   modules={Editor.modules}
    //   formats={Editor.formats}
    //   bounds={".app"}
      placeholder={"Start Writing..."}
    />
  );
};

export default QuillEditor;
