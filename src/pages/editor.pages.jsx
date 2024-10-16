import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { Navigate, useParams } from "react-router-dom";
import BlogEditor from "../components/blogComponents/blog-editor.component";
import PublishForm from "../components/publish-form.component";
import Loader from "../components/loader.component";
import { getBlogDetailsApi } from "../common/api";
import toast from "react-hot-toast";
import apiRequest from "../common/api/apiRequest";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  description: "",
  author: { personal_info: {} },
};

export const EditorContext = createContext(blogStructure);

const Editor = () => {
  // params hook
  const { blog_id } = useParams();

  // state variables
  const [editorState, setEditorState] = useState("editor");
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [blog, setBlog] = useState(blogStructure);
  const [loading, setLoading] = useState(true);

  // context data
  const {
    userAuth: { access_token, isAdmin },
  } = useContext(UserContext);

  useEffect(() => {
    if (!blog_id) {
      return setLoading(false);
    }

    getBlogDetails();
  }, []);

  const getBlogDetails = async () => {
    try {
      const {
        data: { blog },
      } = await apiRequest("POST", getBlogDetailsApi, {
        blog_id,
        draft: true,
        mode: "edit",
      });
      setBlog(blog);
      setLoading(false);
    } catch (error) {
      setBlog(blog);
      setLoading(false);
      console.error("Failed to get blog details:", error.message);
      return toast.error(error.message);
    }
  };

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}>
      {/* {!isAdmin ? (
        <Navigate to="/404" />
      ) :  */}

      {access_token === null ? (
        <Navigate to="/signin" />
      ) : loading ? (
        <Loader />
      ) : editorState === "editor" ? (
        <BlogEditor />
      ) : (
        <PublishForm />
      )}
    </EditorContext.Provider>
  );
};

export default Editor;
