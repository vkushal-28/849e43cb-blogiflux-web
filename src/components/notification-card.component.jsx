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
    // target.setAttribute("disabled", true);

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
        // target.removeAttribute("disabled");

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
      className={`p-6 border-b border-grey border-l-black  ${
        !seen && " border-l-2"
      }`}>
      <div className="flex gap-5 mb-3">
        <img src={profile_img} className="w-14 h-14 flex-none rounded-full" />
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
                <Button
                  className="underline hover:text-black"
                  onClick={handleReplyClick}>
                  Reply
                </Button>
                {/* <button
                  className="underline hover:text-black"
                  onClick={handleReplyClick}>
                  Reply
                </button> */}
              </>
            )}

            <Button
              className="underline hover:text-black"
              onClick={(e) => handleDelete(comment._id, "comment")}>
              Delete
            </Button>
            {/* <button
              className="underline hover:text-black"
              onClick={(e) => handleDelete(comment._id, "comment", e.target)}>
              Delete
            </button> */}
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

          <Button
            className="underline hover:text-black ml-14 mt-2"
            onClick={(e) => handleDelete(reply._id, "reply")}>
            Delete
          </Button>

          {/* <button
            className="underline hover:text-black ml-14 mt-2"
            onClick={(e) => handleDelete(reply._id, "reply", e.target)}>
            Delete
          </button> */}
        </div>
      )}
    </div>
  );
};

export default NotificationCard;
