import React, { useContext, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logoLight from "../imgs/logo-light.png";
import logoDark from "../imgs/logo-dark.png";
import AnimationWrapper from "../common/page-animation";
import { uploadImage } from "../common/aws";
import { Toaster, toast } from "react-hot-toast";
import { EditorContext } from "../pages/editor.pages";
import lightBanner from "../imgs/blog banner light.png";
import darkBanner from "../imgs/blog banner dark.png";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";
import axios from "axios";
import { ThemeContext, UserContext } from "../App";
import Button from "../common/button.component";

const BlogEditor = () => {
  const navigate = useNavigate();
  const { blog_id } = useParams();

  let {
    blog,
    blog: { title = "", banner, content, tags, description },
    setBlog,
    setEditorState,
    textEditor,
    setTextEditor,
  } = useContext(EditorContext);

  const {
    userAuth: { access_token },
  } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (!textEditor.isReady) {
      setTextEditor(
        new EditorJS({
          holderId: "textEditor",
          data: Array.isArray(content) ? content[0] : content,
          tools: tools,
          placeholder: "Let's write an awesomw blog.",
        })
      );
    }
  }, []);

  const handleBannerUpload = (e) => {
    const img = e.target.files[0];

    if (img) {
      let loadingToast = toast.loading("Uploading...");
      uploadImage(img)
        .then((url) => {
          if (url) {
            toast.dismiss(loadingToast);
            toast.success("Uploaded 👍🏼");

            setBlog({ ...blog, banner: url });
          }
        })
        .catch((err) => {
          toast.dismiss(loadingToast);
          return toast.error(err);
        });
    }
  };

  const handleTitleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  const handleTitleChange = (e) => {
    let input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handleError = (e) => {
    let img = e.target;
    img.src = theme == "light" ? lightBanner : darkBanner;
  };

  const hadlePublishEvent = () => {
    if (!banner) {
      return toast.error("Upload a blog banner to publish it");
    }
    if (!title) {
      return toast.error("Write blog title to publish it");
    }

    if (textEditor.isReady) {
      textEditor
        .save()
        .then((data) => {
          if (data.blocks.length) {
            setBlog({ ...blog, content: data });
            setEditorState("publish");
          } else {
            toast.error("Write something in your blog to publish it");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSaveDraft = (e) => {
    if (!title.length) {
      return toast.error("Write blog title before save it as a draft");
    }

    let loadingToast = toast.loading("S aving Draft...");

    if (textEditor.isReady) {
      textEditor.save().then((content) => {
        let blogObj = {
          title,
          banner,
          content,
          description,
          tags,
          draft: true,
        };

        axios
          .post(
            import.meta.env.VITE_SERVER_DOMAIN + "/create-blog",
            { ...blogObj, id: blog_id },
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          )
          .then(() => {
            toast.dismiss(loadingToast);
            toast.success("Saved 👍🏼");

            setTimeout(() => {
              navigate("/dashboard/blogs?tab=draft");
            }, 500);
          })
          .catch(({ response }) => {
            toast.dismiss(loadingToast);
            return toast.error(response.data.error);
          });
      });
    }
  };
  return (
    <>
      <nav className="navbar max-lg:h-[5rem]">
        <Link to="/" className="flex-none w-14">
          <img
            src={theme == "light" ? logoDark : logoLight}
            alt="blogiflux-logo"
          />
        </Link>
        <p className="max-md:hidden text-black  line-clamp-1 w-full">
          {title || "New Blog"}
        </p>

        <div className="flex gap-4 ml-auto">
          <Button
            className="btn-dark py-2"
            onClick={(e) => hadlePublishEvent(e)}>
            Publish
          </Button>
          <Button
            className="btn-light py-2"
            onClick={(e) => handleSaveDraft(e)}>
            Save Draft
          </Button>
        </div>
      </nav>
      <Toaster />
      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video hover:opacity-80 bg-white border-4 border-grey">
              <label htmlFor="uploadBanner">
                <img
                  src={banner}
                  className="z-20"
                  onError={handleError}
                  alt="blog-banner"
                />
                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png, .jpg, .jpeg"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none mt-10 leading-tight placeholder:opacity-40 bg-white"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
              value={title || ""}></textarea>
            <hr className="w-full opacity-10 my-5" />
            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
