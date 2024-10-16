import React from "react";
import { getDay } from "../../common/date";
import { Link } from "react-router-dom";
import Image from "../lazy-image-component";
import BlogUserDetails from "./blog-user-details.component";

const BlogPostCard = React.memo(({ content, author, isLastIndex }) => {
  const {
    title,
    banner,
    publishedAt,
    tags,
    description,
    activity: { total_likes },
    blog_id: id,
  } = content;
  const { fullname, profile_img, username } = author;

  return (
    <>
      <div className="w-full">
        <BlogUserDetails
          className="mt-5"
          username={username}
          fullname={fullname}
          profileImg={profile_img}
          publishedDate={publishedAt}
        />
      </div>
      <div
        className={`flex gap-8 items-start justify-between ${
          !isLastIndex && "border-b border-grey"
        } pb-4 mb-4`}>
        <Link to={`/blog/${id}`}>
          <h1 className="blog-title font-gelasio text-black hover:underline">
            {title}
          </h1>
          <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2 text-dark-grey ">
            {description}
          </p>

          <div className="flex gap-4 items-center mt-5 mb-2">
            <span className="btn-light py-1 px-4 ">{tags[0]}</span>
            <span className="ml-3 flex items-center gap-2 text-dark-grey/70">
              <i className="fi fi-rr-heart text-xl"></i>
              {total_likes}
            </span>
          </div>
        </Link>
        <Link to={`/blog/${id}`}>
          <div className="h-28 aspect-square ">
            <Image
              src={banner}
              className="w-full h-full aspect-square rounded-lg  object-cover"
              type="blog-list"
              alt=""
            />
          </div>
        </Link>
      </div>
    </>
  );
});

export default BlogPostCard;
