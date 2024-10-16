import React from "react";
import { Link } from "react-router-dom";
import BlogUserDetails from "./blogComponents/blog-user-details.component";

const MinimalBlogPostCard = React.memo(({ blog, index, isLast }) => {
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
        <BlogUserDetails
          username={username}
          fullname={fullname}
          profileImg={profile_img}
          publishedDate={publishedAt}
        />
        <h1 className="blog-title mb-5">{title}</h1>
        {!isLast && <hr className="border-grey " />}
      </div>
    </Link>
  );
});

export default MinimalBlogPostCard;
