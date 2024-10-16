import React from "react";
import { Link } from "react-router-dom";
import { getDay } from "../../common/date";

const BlogUserDetails = React.memo(
  ({ username, fullname, profileImg, publishedDate, className }) => {
    return (
      <Link to={`/user/${username}`}>
        <div
          className={`${className} flex gap-2 items-center mb-3 text-dark-grey`}>
          <img
            src={profileImg}
            className="h-6 w-6 rounded-full"
            alt="profile-image"
          />
          <p className="line-clamp-1">
            {fullname} @{username}
          </p>
          <p className="min-w-fit">{getDay(publishedDate)}</p>
        </div>
      </Link>
    );
  }
);

export default BlogUserDetails;
