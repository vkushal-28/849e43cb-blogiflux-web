import React, { useEffect, useState } from "react";
import AnimationWrapper from "../common/page-animation";
import InPageNavigation, {
  activeTabRef,
} from "../components/inpage-navigation.component";
import axios from "axios";
import BlogPostCard from "../components/blog-post.component";
import MinimalBlogPostCard from "../components/nobanner-blog-post.component";
import NoDataMessage from "../components/nodata.component";
import { filterPaginationdata } from "../common/filter-pagination-data";
import LoadMoreData from "../common/load-more.component";
import {
  BlogListLoader,
  MinimalBlogListLoader,
} from "../components/loaders/blog-loader.component";

const HomePage = () => {
  const [blogs, setBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [loading, setLoading] = useState(false);

  let categories = [
    "programming",
    "hollywood",
    "film making",
    "social media",
    "cooking",
    "technology",
    "finances",
    "travel",
  ];

  const fetchLatestBlogs = ({ page = 1 }) => {
    setLoading(true);
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/latest-blogs", { page })
      .then(async ({ data }) => {
        setLoading(false);

        let formatedData = await filterPaginationdata({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });

        setBlogs(formatedData);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_DOMAIN + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadBlogByCategory = (e) => {
    const category = e.target.innerText.toLowerCase();
    setBlogs(null);

    if (pageState == category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  const fetchBlogsByCategory = ({ page = 1 }) => {
    axios
      .post(import.meta.env.VITE_SERVER_DOMAIN + "/search-blogs", {
        tag: pageState,
        page,
      })
      .then(async ({ data }) => {
        let formatedData = await filterPaginationdata({
          state: blogs,
          data: data.blogs,
          page,
          countRoute: "/search-blogs-count",
          data_to_send: { tag: pageState },
        });
        setBlogs(formatedData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    activeTabRef.current.click();

    if (pageState == "home") {
      fetchLatestBlogs({ page: 1 });
    } else {
      fetchBlogsByCategory({ page: 1 });
    }

    if (!trendingBlogs) {
      fetchTrendingBlogs();
    }
  }, [pageState]);

  useEffect(() => {
    const modalSet = setTimeout(() => {
      if (loading) {
        alert(
          "Please note: The API is hosted on a demo server. Due to idle time, the initial data load may take 25-30 seconds, but subsequent responses will be much faster. Thank you for your patience! 😊"
        );
      }
    }, 1000);

    return () => {
      clearTimeout(modalSet);
    };
  }, [loading]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10 ">
        {/* Latest blogs component */}

        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
            defaultHidden={["trending blogs"]}>
            <>
              {blogs == null ? (
                <BlogListLoader />
              ) : blogs.result.length ? (
                blogs.result.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}>
                      <BlogPostCard
                        content={blog}
                        author={blog.author.personal_info}
                      />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"No blogs published"} />
              )}
              <LoadMoreData
                state={blogs}
                fetchDataFunc={
                  pageState == "home" ? fetchLatestBlogs : fetchBlogsByCategory
                }
              />
            </>

            <>
              {trendingBlogs == null ? (
                <MinimalBlogListLoader />
              ) : trendingBlogs.length ? (
                trendingBlogs.map((blog, i) => {
                  return (
                    <AnimationWrapper
                      transition={{ duration: 1, delay: i * 0.1 }}
                      key={i}>
                      <MinimalBlogPostCard blog={blog} index={i} />
                    </AnimationWrapper>
                  );
                })
              ) : (
                <NoDataMessage message={"No trending blogs published"} />
              )}
            </>
          </InPageNavigation>
        </div>

        {/* Filters and trending blogs component */}

        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-5 mb-6">
            <h1 className="font-medium text-xl">Stories from all interests</h1>
            <div className="flex gap-3 flex-wrap">
              {categories.map((category, i) => {
                return (
                  <button
                    className={`tag ${
                      pageState == category && "bg-black text-white"
                    } `}
                    key={i}
                    onClick={loadBlogByCategory}>
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <h1 className="font-medium text-xl  mb-8">
              Trending <i className="fi fi-rr-arrow-trend-up"></i>
            </h1>
            {trendingBlogs == null ? (
              <MinimalBlogListLoader />
            ) : trendingBlogs.length ? (
              trendingBlogs.map((blog, i) => {
                return (
                  <AnimationWrapper
                    transition={{ duration: 1, delay: i * 0.1 }}
                    key={i}>
                    <MinimalBlogPostCard blog={blog} index={i} />
                  </AnimationWrapper>
                );
              })
            ) : (
              <NoDataMessage message={"No trending blogs published"} />
            )}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default HomePage;
