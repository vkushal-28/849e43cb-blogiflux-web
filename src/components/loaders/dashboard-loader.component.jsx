import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../../App";
import "react-loading-skeleton/dist/skeleton.css";

export const NotificationLoader = ({ type }) => {
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#303030" : "#F3F3F3"}`}
      highlightColor={`${theme == "dark" ? "#2A2A2A" : "#e6e6e6"}`}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div
          className={`p-6 border-b border-grey border-l-black  ${
            !seen && " border-l-2"
          }`}>
          <div className="flex gap-5 mb-3">
            <Skeleton
              count={1}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="w-fill">
              <h1 className="font-medium text-xl text-dark-grey">
                <span className="lg:inline-block hidden capitalize">
                  fullname
                </span>
                <div className="mx-1 text-black underline">cdffddf</div>
                <span className="font-normal">
                  {type == "like"
                    ? "liked your blog"
                    : type == "comment"
                    ? "commented on"
                    : "replied on"}
                </span>
              </h1>
              {
                type == "reply" ? (
                  <div className="p-4 mt-4 rounded-md bg-grey">
                    <p>{replied_on_comment.comment}</p>
                  </div>
                ) : (
                  <Link
                    to={`/blog/${blog_id}`}
                    className="font-medium text-dark-grey hover:underline line-clamp-1">{`"${title}"`}</Link>
                )
                // blog title
              }
            </div>
          </div>

          {type !== "like" && (
            <p className="ml-14 pl-5 font-gelasio text-xl my-5">
              {comment?.comment}
            </p>
          )}

          <div className="ml-14 pl-5 mt-3 text-dark-grey flex gap-8">
            <p>{getDay(createdAt)}</p>

            {type !== "like" ? (
              <>
                {!reply && (
                  <>
                    <button
                      className="underline hover:text-black"
                      onClick={handleReplyClick}>
                      Reply
                    </button>
                  </>
                )}
                <button
                  className="underline hover:text-black"
                  onClick={(e) =>
                    handleDelete(comment._id, "comment", e.target)
                  }>
                  Delete
                </button>
              </>
            ) : (
              ""
            )}
          </div>

          {isReplying && (
            <div className="mt-8">
              <NotificationCommentField
                _id={_id}
                blog_author={user}
                index={index}
                replyingTo={comment._id}
                setIsReplying={setIsReplying}
                notification_id={notification_id}
                notificationData={notificationState}
              />
            </div>
          )}

          {reply && (
            <div className="ml-20 p-5 bg-grey mt-5 rounded-md">
              <div className="flex gap-3 mb-3">
                <img
                  src={author_profile_image}
                  className="w-8 h-8 rounded-full"
                  alt=""
                />
                <div>
                  <h1 className="font-medium text-xl text-dark-grey">
                    <Link
                      to={`/user/${author_username}`}
                      className="mx-1 text-black underline">
                      @{author_username}
                    </Link>

                    <span className="font-normal">replied to</span>

                    <Link
                      to={`/user/${username}`}
                      className="mx-1 text-black underline">
                      @{username}
                    </Link>
                  </h1>
                </div>
              </div>
              <p className="ml-14 font-gelasio text-xl my-2">{reply.comment}</p>

              <button
                className="underline hover:text-black ml-14 mt-2"
                onClick={(e) => handleDelete(reply._id, "reply", e.target)}>
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </SkeletonTheme>
  );
};

export const MinimalBlogListLoader = () => {
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#303030" : "#F3F3F3"}`}
      highlightColor={`${theme == "dark" ? "#2A2A2A" : "#e6e6e6"}`}>
      {Array.apply(null, { length: 7 }).map((e, i) => (
        <div className="flex gap-5 mb-8">
          <h1 className="">
            <Skeleton count={1} height={40} width={40} />
          </h1>

          <div className="w-full">
            <div className="flex gap-2 items-center mb-7">
              <Skeleton
                count={1}
                height={25}
                width={25}
                className="rounded-full"
              />

              <Skeleton count={1} height={13} width={150} />
            </div>

            <h1 className="blog-title">
              <Skeleton count={1} width={"100%"} height={20} />
              <Skeleton count={1} width={"70%"} height={20} />
            </h1>
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};
