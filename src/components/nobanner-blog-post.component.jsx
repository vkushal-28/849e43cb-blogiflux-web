import React from "react";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";

const MinimalBlogPostCard = ({ blog, index, isLast }) => {
  const {
    title,
    blog_id: id,
    author: {
      personal_info: { fullname, username, profile_img },
    },
    publishedAt,
  } = blog;
  return (
    <Link to={`/blog/${id}`} className="flex gap-5 mb-5">
      <h1 className="blog-index">
        {index < 10 ? "0" + (index + 1) : index + 1}
      </h1>

      <div>
        <Link to={`/user/${username}`}>
          <div className="flex gap-2 items-center mb-3 text-dark-grey">
            <img
              src={profile_img}
              className="h-6 w-6 rounded-full"
              alt="profile-image"
            />
            <p className="line-clamp-1">
              {fullname} @{username}
            </p>
            <p className="min-w-fit">{getDay(publishedAt)}</p>
          </div>
        </Link>
        <h1 className="blog-title mb-5">{title}</h1>
        {!isLast && <hr className="border-grey " />}
      </div>
    </Link>
  );
};

export default MinimalBlogPostCard;
