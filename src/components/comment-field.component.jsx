import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import toast from "react-hot-toast";
import axios from "axios";
import { BlogContext } from "../pages/blog.page";
import Button from "../common/button.component";

const CommentField = React.memo(
  ({ action, index = undefined, replyingTo = undefined, setIsReplying }) => {
    let {
      userAuth: { access_token, username, fullname, profile_img },
    } = useContext(UserContext);
    let {
      blog,
      blog: {
        _id,
        author: { _id: blog_author },
        comments,
        comments: { results: commentsArr },
        activity,
        activity: { total_comments, total_parent_comments },
      },
      setBlog,
      setTotalParentCommentsLoaded,
    } = useContext(BlogContext);

    const [comment, setComment] = useState("");

    const handleComment = (e) => {
      if (!access_token) {
        return toast.error("Please login first to leave a comment");
      }
      if (!comment.length) {
        return toast.error("Write something to leave a comment...");
      }

      axios
        .post(
          import.meta.env.VITE_SERVER_DOMAIN + "/add-comment",
          {
            _id,
            blog_author,
            comment,
            replying_to: replyingTo,
          },
          { headers: { Authorization: `Bearer ${access_token}` } }
        )
        .then(({ data }) => {
          setComment("");
          data.commented_by = {
            personal_info: { username, profile_img, fullname },
          };
          let newCommentArr;

          if (replyingTo) {
            commentsArr[index].children.push(data._id);

            data.childrenLevel = commentsArr[index].childrenLevel + 1;

            data.parentIndex = index;

            commentsArr[index].isReplyLoaded = true;

            commentsArr.splice(index + 1, 0, data);

            newCommentArr = commentsArr;

            setIsReplying(false);
          } else {
            data.childrenLevel = 0;

            newCommentArr = [data, ...commentsArr];
          }

          let parentCommentIncrementVal = replyingTo ? 0 : 1;

          setBlog({
            ...blog,
            comments: { ...comments, results: newCommentArr },
            activity: {
              ...activity,
              total_comments: total_comments + 1,
              total_parent_comments:
                total_parent_comments + parentCommentIncrementVal,
            },
          });
          setTotalParentCommentsLoaded(
            (preVal) => preVal + parentCommentIncrementVal
          );
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
          {action}
        </Button>
      </>
    );
  }
);

export default CommentField;
