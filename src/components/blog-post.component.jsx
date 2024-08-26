import React from "react";
import { getDay } from "../common/date";
import { Link } from "react-router-dom";
import Image from "./lazy-image-component";

const BlogPostCard = ({ content, author }) => {
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
    <div className="flex gap-8 items-center border-b border-grey pb-5 mb-4">
      <div className="w-full">
        <Link to={`/user/${username}`}>
          <div className="flex gap-2 items-center mb-7">
            <img src={profile_img} className="h-6 w-6 rounded-full " />
            <p className="line-clamp-1">
              {fullname} @{username}
            </p>
            <p className="min-w-fit">{getDay(publishedAt)}</p>
          </div>
        </Link>
        <Link to={`/blog/${id}`}>
          <h1 className="blog-title text-black">{title}</h1>
        </Link>
        <p className="my-3 text-xl font-gelasio leading-7 max-sm:hidden md:max-[1100px]:hidden line-clamp-2">
          {description}
        </p>

        <div className="flex gap-4 mt-7">
          <span className="btn-light py-1 px-4 mb-2">{tags[0]}</span>
          <span className="ml-3 flex items-center gap-2 text-dark-grey">
            <i className="fi fi-rr-heart text-xl"></i>
            {total_likes}
          </span>
        </div>
      </div>
      <div className="h-28 aspect-square ">
        <Image
          src={banner}
          className="w-full h-full aspect-square rounded-lg  object-cover"
          type="blog-list"
          alt=""
        />
      </div>
    </div>
  );
};

export default BlogPostCard;
