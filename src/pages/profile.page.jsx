import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { UserContext } from "../App";
import AboutUser from "../components/about.component";
import { filterPaginationdata } from "../common/filter-pagination-data";
import InPageNavigation from "../components/inpage-navigation.component";
import NoDataMessage from "../components/nodata.component";
import LoadMoreData from "../common/load-more.component";
import BlogPostCard from "../components/blog-post.component";
import PageNotFound from "./404.page";
import { getProfileDetailsApi, getSearchedBlogsApi } from "../common/api";
import apiRequest from "../common/api/apiRequest";
import { BlogListLoader } from "../components/loaderComponents/blog-loader.component";
import { ProfileDetailsLoader } from "../components/loaderComponents/profile-loader-component";

export const profileDataStructure = {
  personal_info: {
    fullname: "",
    username: "",
    profile_img: "",
    bio: "",
  },
  account_info: {
    total_posts: 0,
    total_reads: 0,
  },
  social_links: {},
  joinedAt: "",
};

const ProfilePage = () => {
  // fetch url params
  const { id: profileId } = useParams();

  // state variables
  const [profile, setProfile] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [profileLoaded, setProfileLoaded] = useState("");
  const [blogs, setBlogs] = useState(null);

  // destructure profile obj
  const {
    personal_info: { fullname, username: profile_username, profile_img, bio },
    account_info: { total_posts, total_reads },
    social_links,
    joinedAt,
  } = profile;

  // context data
  let {
    userAuth: { username },
  } = useContext(UserContext);

  const fetchUserProfile = async () => {
    try {
      const { data: user } = await apiRequest("POST", getProfileDetailsApi, {
        username: profileId,
      });
      if (user !== null) setProfile(user);

      setLoading(false);
      setProfileLoaded(profileId);
      fetchBlogs({ user_id: user._id });
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);
      setLoading(false);
    }
  };

  const fetchBlogs = async ({ page = 1, user_id }) => {
    user_id = user_id == undefined ? blogs.user_id : user_id;

    try {
      const { data } = await apiRequest("POST", getSearchedBlogsApi, {
        author: user_id,
        page,
      });
      let formatedData = await filterPaginationdata({
        state: blogs,
        data: data.blogs,
        page,
        countRoute: "/search-blogs-count",
        data_to_send: { author: user_id },
      });

      formatedData.user_id = user_id;
      setBlogs(formatedData);
    } catch (error) {
      console.error("Failed to fetch userblogs:", error.response);
    }
  };

  useEffect(() => {
    if (profileId !== profileLoaded) {
      setBlogs(null);
    }
    if (blogs == null) {
      resetStatus();
      fetchUserProfile();
    }
  }, [profileId, blogs]);

  const resetStatus = () => {
    setProfile(profileDataStructure);
    setLoading(true);
    setBlogs;
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <ProfileDetailsLoader />
      ) : profile_username.length ? (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
          <div className="flex flex-col max-md:items-center gap-3 max-md:gap-2 min-w-[250px]">
            <img
              src={profile_img}
              className="h-48 w-48 bg-grey rounded-full md:w-32 md:h-32"
              alt="profile-image"
            />

            <h1 className="text-2xl font-medium m-0">@ {profile_username}</h1>
            <p className="text-xl capitalize h-6">{fullname}</p>
            <p>
              {total_posts.toLocaleString()} Blogs -{" "}
              {total_reads.toLocaleString()} Reads
            </p>
            <div className="flex gap-4 mt-1">
              {username && profileId == username ? (
                <Link
                  to="/settings/edit-profile"
                  className="btn-light rounded-md">
                  Edit Profile
                </Link>
              ) : (
                ""
              )}
            </div>

            <AboutUser
              className={"max-md:hidden"}
              bio={bio}
              social_links={social_links}
              joinedAt={joinedAt}
            />
          </div>

          <div className="max-md:mt-5 w-full">
            <InPageNavigation
              routes={["Blogs Published", "About"]}
              defaultHidden={["About"]}>
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
                <LoadMoreData state={blogs} fetchDataFunc={fetchBlogs} />
              </>
              <AboutUser
                bio={bio}
                social_links={social_links}
                joinedAt={joinedAt}
              />
            </InPageNavigation>
          </div>
        </section>
      ) : (
        <PageNotFound />
      )}
    </AnimationWrapper>
  );
};

export default ProfilePage;
