import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { filterPaginationdata } from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import AnimationWrapper from "../common/page-animation";
import {
  ManageBlogCard,
  ManageDraftCard,
} from "../components/blogComponents/manage-blogcard.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreData from "../common/load-more.component";
import { useSearchParams } from "react-router-dom";
import { getUserWrittenBlogsApi } from "../common/api";
import apiRequest from "../common/api/apiRequest";
import { PublishedBlogLoader } from "../components/loaderComponents/blog-loader.component";

const ManageBlogs = () => {
  // url params data
  let activeTab = useSearchParams()[0].get("tab");

  // state variables
  const [blogs, setBlogs] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [query, setQuery] = useState("");

  // context data
  const {
    userAuth: { access_token },
  } = useContext(UserContext);

  const getBlogs = async ({ page, draft, deletedDocCount = 0 }) => {
    try {
      const { data } = await apiRequest(
        "POST",
        getUserWrittenBlogsApi,
        {
          page,
          draft,
          query,
          deletedDocCount,
        },
        true
      );
      let formatedData = await filterPaginationdata({
        state: draft ? drafts : blogs,
        data: data.blogs,
        page,
        user: access_token,
        countRoute: "/user-written-blogs-count",
        data_to_send: { draft, query },
      });

      draft ? setDrafts(formatedData) : setBlogs(formatedData);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);
    }
  };

  useEffect(() => {
    if (access_token) {
      if (blogs == null) {
        getBlogs({ page: 1, draft: false });
      }
      if (drafts == null) {
        getBlogs({ page: 1, draft: true });
      }
    }
  }, [access_token, blogs, drafts, query]);

  const handleSearch = (e) => {
    let searchQuery = e.target.value;

    setQuery(searchQuery);

    if (e.keyCode == 13 && searchQuery.length) {
      setBlogs(null);
      setDrafts(null);
    }
  };

  const handleChange = (e) => {
    if (!e.target.value.length) {
      setQuery("");
      setBlogs(null);
      setDrafts(null);
    }
  };

  return (
    <>
      <h1 className="max-md:hidden text-xl mt-1">Manage Blogs</h1>
      <div className="w-full relative max-md:mt-3 md:mt-6 max-md:mb-1 mb-3">
        <input
          type="search"
          className="w-full bg-grey p-4 pl-12 pr-6 rounded-full placeholder:text-dark-grey"
          placeholder="Search Blogs"
          onChange={handleChange}
          onKeyDown={handleSearch}
        />

        <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey"></i>
      </div>
      <InPageNavigation
        routes={["Published Blogs", "draft"]}
        defaultHidden={[""]}
        defaultActiveIndex={activeTab !== "draft" ? 0 : 1}>
        {blogs === null ? (
          <PublishedBlogLoader />
        ) : blogs.result.length ? (
          <>
            {blogs.result.map((blog, i) => {
              return (
                <AnimationWrapper key={i} transition={{ delay: i * 0.04 }}>
                  {/* <PublishedBlogLoader /> */}
                  <ManageBlogCard
                    blog={{ ...blog, index: i, setStateFunc: setBlogs }}
                  />
                </AnimationWrapper>
              );
            })}

            <LoadMoreData
              state={blogs}
              additaionalParam={{
                draft: false,
                deletedDocCount: blogs.deletedDocCount,
              }}
              fetchDataFunc={getBlogs}
            />
          </>
        ) : (
          <NoDataMessage message="No published blogs" />
        )}

        {drafts === null ? (
          <PublishedBlogLoader draft={true} />
        ) : drafts.result.length ? (
          <>
            {drafts.result.map((blog, i) => {
              return (
                <AnimationWrapper key={i} transition={{ delay: i * 0.04 }}>
                  <ManageDraftCard
                    blog={{ ...blog, index: i, setStateFunc: setDrafts }}
                  />
                </AnimationWrapper>
              );
            })}
            <LoadMoreData
              state={drafts}
              additaionalParam={{
                draft: true,
                deletedDocCount: drafts.deletedDocCount,
              }}
              fetchDataFunc={getBlogs}
            />
          </>
        ) : (
          <NoDataMessage message="No draft blogs" />
        )}
      </InPageNavigation>
    </>
  );
};

export default ManageBlogs;
