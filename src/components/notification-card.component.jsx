import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import NotificationCommentField from "./notification-comment-field.component";
import { UserContext } from "../App";
import axios from "axios";
import Button from "../common/button.component";

const NotificationCard = ({ data, index, notificationState }) => {
  const [isReplying, setIsReplying] = useState(false);

  let {
    _id: notification_id,
    type,
    reply,
    seen,
    createdAt,
    replied_on_comment,
    blog: { _id, blog_id, title },
    comment,
    user,
    user: {
      personal_info: { profile_img, fullname, username },
    },
  } = data;

  let {
    userAuth: {
      username: author_username,
      profile_img: author_profile_image,
      access_token,
    },
  } = useContext(UserContext);

  let {
    notifications,
    notifications: { result, totalDocs },
    setNotifications,
  } = notificationState;

  const handleReplyClick = (e) => {
    setIsReplying((preVal) => !preVal);
  };

  const handleDelete = (comment_id, type, target) => {
    axios
      .post(
        import.meta.env.VITE_SERVER_DOMAIN + "/delete-comment",
        { _id: comment_id },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(() => {
        if (type == "comment") {
          result.splice(index, 1);
        } else {
          delete result[index].reply;
        }

        setNotifications({
          ...notifications,
          result,
          totalDocs: totalDocs - 1,
          deletedDocCount: notifications.deletedDocCount + 1,
        });
      });
  };

  return (
    <div
      className={`p-1 py-4 md:px-4 lg:px-6 border-b border-grey border-l-black  ${
        !seen && " border-l-2"
      }`}>
      <div className="flex gap-3 lg:gap-5 mb-3">
        <img
          src={profile_img}
          alt="profile-image"
          className="w-10 h-10 lg:w-14 lg:h-14 flex-none rounded-full"
        />
        <div className="w-fill">
          <h1 className="font-medium text-xl text-dark-grey">
            <span className="lg:inline-block hidden capitalize">
              {fullname}
            </span>
            <Link
              to={`/user/${username}`}
              className="mx-1 text-black underline">
              {" "}
              @{username}{" "}
            </Link>
            <span className="font-normal">
              {type == "like"
                ? "liked your blog"
                : type == "comment"
                ? "commented on"
                : "replied on"}
            </span>
          </h1>
          {type == "reply" ? (
            <div className="p-4 mt-4 rounded-md bg-grey">
              <p>{replied_on_comment.comment}</p>
            </div>
          ) : (
            <Link
              to={`/blog/${blog_id}`}
              className="font-medium text-dark-grey hover:underline line-clamp-1">{`"${title}"`}</Link>
          )}
        </div>
      </div>

      {type !== "like" && (
        <p className="ml-14 pl-5 font-gelasio text-xl my-3  ">
          {comment?.comment}
        </p>
      )}

      <div className="ml-14 pl-5 mt-3 text-dark-grey flex gap-8">
        <p>{getDay(createdAt)}</p>

        {type !== "like" ? (
          <>
            {!reply && (
              <>
                <Button
                  className="underline hover:text-black"
                  onClick={handleReplyClick}>
                  Reply
                </Button>
              </>
            )}

            <Button
              className="underline hover:text-black"
              onClick={(e) => handleDelete(comment._id, "comment")}>
              Delete
            </Button>
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
        <div className="ml-20 p-4 bg-grey mt-5 rounded-md w-fit lg:w-full">
          <div className="flex gap-3 mb-3">
            <img
              src={author_profile_image}
              className="w-8 h-8 rounded-full"
              alt="author-profile-image"
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

          <Button
            className="underline hover:text-black ml-14 mt-2"
            onClick={(e) => handleDelete(reply._id, "reply")}>
            Delete
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
