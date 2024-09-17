import React, { createContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import Loader from "../components/loader.component";
import { getDay } from "../common/date";
import BlogInteraction from "../components/blog-interaction.component";
import BlogPostCard from "../components/blog-post.component";
import BlogContent from "../components/blog-content.component";
import CommentsContainer, {
  fetchComments,
} from "../components/comments.component";
import Image from "../components/lazy-image-component";
import { getBlogDetailsApi, getSearchedBlogsApi } from "../common/api";
import apiRequest from "../common/api/apiRequest";

const blogStructure = {
  title: "",
  description: "",
  banner: "",
  content: [],
  comments: {},
  tags: [],
  activity: {},
  author: { personal_info: {} },
  publishedAt: "",
};

export const BlogContext = createContext({});

const BlogPage = () => {
  // url params
  const { blog_id } = useParams();

  // State Data
  const [blog, setBlog] = useState(blogStructure);
  const [similarBlogs, setSimilarBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLikedByUser, setLikedByUser] = useState(false);
  const [commentsWrapper, setCommentsWrapper] = useState(false);
  const [totalParentCommentsLoaded, setTotalParentCommentsLoaded] = useState(0);

  // Destructure blog object
  let {
    title,
    content,
    banner,
    author: {
      personal_info: { fullname, username: author_username, profile_img },
    },
    publishedAt,
  } = blog;

  const fetchBlog = async () => {
    try {
      const {
        data: { blog },
      } = await apiRequest("POST", getBlogDetailsApi, { blog_id });

      blog.comments = await fetchComments({
        blog_id: blog._id,
        setParentCommentCountFunc: setTotalParentCommentsLoaded,
      });

      setBlog(blog);

      try {
        const { data } = await apiRequest("POST", getSearchedBlogsApi, {
          tag: blog.tags[0],
          limit: 6,
          eliminate_blog: blog_id,
        });
        setSimilarBlogs(data.blogs);
      } catch (error) {
        console.error("Failed to fetch user data:", error.response);
      }

      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch blog details:", error.response);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    resetStates();
  }, [blog_id]);

  const resetStates = () => {
    setBlog(blogStructure);
    setSimilarBlogs(null);
    setLoading(null);
    setLikedByUser(false);
    setTotalParentCommentsLoaded(0);
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <BlogContext.Provider
          value={{
            blog,
            setBlog,
            setLikedByUser,
            isLikedByUser,
            commentsWrapper,
            setCommentsWrapper,
            totalParentCommentsLoaded,
            setTotalParentCommentsLoaded,
          }}>
          <CommentsContainer />
          <div className="max-w-[900px] center py-10 max-lg:px-[5vw]">
            <Image
              src={banner}
              className="aspect-video rounded-md max-md:h-full md:h-[600px] w-full"
              type="blog-details"
              alt=""
            />

            <div className="mt-12">
              <h2>{title}</h2>
              <div className="flex max-sm:flex-col justify-between my-8">
                <div className="flex gap-5 items-start">
                  <img
                    src={profile_img || null}
                    alt="profile-image"
                    className="w-12 h-12 rounded-full"
                  />
                  <p>
                    {fullname}
                    <br />@
                    <Link to={`/user/${author_username}`} className="underline">
                      {author_username}
                    </Link>
                  </p>
                </div>
                <p className="text-dark-grey opacity-75 max-sm:mt-6 max-sm:ml-12 max-sm:pl-5">
                  published on {getDay(publishedAt)}
                </p>
              </div>
            </div>

            {/* Blog integration component */}
            <BlogInteraction />

            {/* Blog content component */}
            {content &&
              content.length &&
              content[0].blocks.map((block, i) => {
                return (
                  <div className="my-4 md:my-8" key={i}>
                    <BlogContent block={block} />
                  </div>
                );
              })}

            {/* render blog interaction component */}
            <BlogInteraction />

            {/* render similar blogs */}
            {similarBlogs !== null && similarBlogs.length ? (
              <>
                <h1 className="text-2xl mt-14 mb-10 font-medium">
                  Similar Blogs
                </h1>

                {similarBlogs.map((blog, i) => {
                  let {
                    author: { personal_info },
                  } = blog;

                  return (
                    <AnimationWrapper
                      key={i}
                      transition={{ duration: 1, delay: i * 0.08 }}>
                      <BlogPostCard content={blog} author={personal_info} />
                    </AnimationWrapper>
                  );
                })}
              </>
            ) : null}
          </div>
        </BlogContext.Provider>
      )}
    </AnimationWrapper>
  );
};

export default BlogPage;
