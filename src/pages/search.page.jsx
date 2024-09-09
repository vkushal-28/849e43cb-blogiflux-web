import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InPageNavigation from "../components/inpage-navigation.component";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import BlogPostCard from "../components/blog-post.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreData from "../common/load-more.component";
import { filterPaginationdata } from "../common/filter-pagination-data";
import UserCard from "../components/usercard.component";
import apiRequest from "../common/api/apiRequest";
import { getSearchedBlogsApi, searchUsersAPI } from "../common/api";

const SearchPage = () => {
  // fetch params data
  const { query } = useParams();

  // state data
  const [blogs, setBlogs] = useState(null);
  const [users, setUsers] = useState(null);

  const searchBlogs = async ({ page = 1, create_new_arr = false }) => {
    try {
      const { data } = await apiRequest("POST", getSearchedBlogsApi, {
        query,
        page,
      });
      let formatedData = await filterPaginationdata({
        state: blogs,
        data: data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { query },
        create_new_arr,
      });

      setBlogs(formatedData);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);
    }
  };

  const fetchUsers = async () => {
    try {
      const {
        data: { users },
      } = await apiRequest("POST", searchUsersAPI, {
        query,
      });
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);
    }
  };
  useEffect(() => {
    resetAllState();
    searchBlogs({ page: 1, create_new_arr: true });
    fetchUsers();
  }, [query]);

  const resetAllState = () => {
    setBlogs(null);
    setUsers(null);
  };

  const UserCardWrapper = () => {
    return (
      <>
        {users == null ? (
          <Loader />
        ) : users.length ? (
          users.map((user, i) => {
            return (
              <AnimationWrapper
                key={i}
                transition={{ duration: 1, delay: i * 0.08 }}>
                <UserCard user={user} />
              </AnimationWrapper>
            );
          })
        ) : (
          <NoDataMessage message={"No user found"} />
        )}
      </>
    );
  };
  return (
    <section className="h-cover flex justify-center gap-10">
      <div className="w-full">
        <InPageNavigation
          routes={[`search results fron "${query}`, "Accounts Matched"]}
          defaultHidden={["Accounts Matched"]}>
          <>
            {blogs == null ? (
              <Loader />
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
            <LoadMoreData state={blogs} fetchDataFunc={searchBlogs} />
          </>

          <UserCardWrapper />
        </InPageNavigation>
      </div>
      <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-l border-grey pl-8 pt-3 max-md:hidden">
        <h1 className="font-medium text-xl mb-8 ">
          User related to search <i className="fi fi-rr-user"></i>
        </h1>
        <UserCardWrapper />
      </div>
    </section>
  );
};

export default SearchPage;
