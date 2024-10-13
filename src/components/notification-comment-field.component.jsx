import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import axios from "axios";
import Button from "../common/button.component";
import toast from "react-hot-toast";

const NotificationCommentField = React.memo(
  ({
    _id,
    blog_author,
    index = undefined,
    replyingTo = undefined,
    setIsReplying,
    notification_id,
    notificationData,
  }) => {
    const [comment, setComment] = useState("");

    let { _id: user_id } = blog_author;

    let {
      userAuth: { access_token },
    } = useContext(UserContext);
    let {
      notifications,
      notifications: { result },
      setNotifications,
    } = notificationData;

    const handleComment = (e) => {
      if (!comment.length) {
        return toast.error("Write something to leave a comment...");
      }

      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/add-comment",
          {
            _id,
            blog_author: user_id,
            comment,
            replying_to: replyingTo,
            notification_id,
          },
          { headers: { Authorization: `Bearer ${access_token}` } }
        )
        .then(({ data }) => {
          setIsReplying(false);

          result[index].reply = { comment, _id: data._id };

          setNotifications({ ...notifications, result });
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <>
        <textarea
          value={comment}
          placeholder="Leave a comment..."
          className="input-box pl-5 placeholder:text-dark-grey resize-none h-[150px] overflow-auto"
          onChange={(e) => setComment(e.target.value)}></textarea>
        <Button
          className="btn-dark mt-5 px-10"
          onClick={(e) => handleComment(e)}>
          Reply
        </Button>
      </>
    );
  }
);

export default NotificationCommentField;
