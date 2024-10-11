import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { getDay } from "../common/date";
import { UserContext } from "../App";
import axios from "axios";
import Image from "./lazy-image-component";
import Button from "../common/button.component";

const BlogStats = ({ stats }) => {
  return (
    <div className="flex gap-2 max-lg:mb-6 border-grey max-lg:border-b">
      {Object.keys(stats).map((key, i) => {
        return (
          !key.includes("parent") && (
            <div
              className={`flex flex-col items-center w-full h-full justify-center p-4 px-6  ${
                i !== 0 && "border-grey border-l "
              }`}
              key={i}>
              <h1 className="text-xl lg:text-2xl ">
                {stats[key].toLocaleString()}
              </h1>
              <p className="text-dark-grey capitalize ">{key.split("_")[1]}</p>
            </div>
          )
        );
      })}
    </div>
  );
};

export const ManageBlogCard = ({ blog }) => {
  let { banner, blog_id, title, publishedAt, activity, index } = blog;

  index++;

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  const [showStats, setShowStats] = useState(false);
  return (
    <>
      <div
        className="flex gap-0 md:gap-10 border-b  md:mb-3  border-grey pb-5 md:pb-4 items-center"
        keu={index}>
        <Image
          src={banner}
          className="max-md:hidden lg:hidden xl:block w-28 h-28 flex-none bg-grey object-cover rounded-md"
          type="blog-list"
          alt=""
        />

        <div
          className={`flex flex-col justify-between ${
            index !== 1 ? "max-md:mt-4" : "max-md:mt-0"
          }  w-full min-w-[300px] `}>
          <div>
            <Link
              to={`/blog/${blog_id}`}
              className="blog-title mb-2 hover:underline">
              {title}
            </Link>
            <p className="line-clamp-1 text-dark-grey">
              Published on {getDay(publishedAt)}
            </p>
          </div>

          <div className="flex gap-6 mt-6 max-md:mt-4">
            <Link to={`/editor/${blog_id}`} className="pr-4 ">
              Edit
            </Link>

            <Button
              className="lg:hidden pr-4 underline "
              onClick={() => {
                setShowStats((preVal) => !preVal);
              }}>
              Status
            </Button>
            {/* <button
              className="lg:hidden pr-4 py-2 underline "
              onClick={() => {
                setShowStats((preVal) => !preVal);
              }}>
              Status
            </button> */}

            <Button
              className="pr-4  text-red"
              onClick={(e) => deleteBlog(blog, access_token)}>
              Delete
            </Button>
            {/* <button
              className="pr-4 py-2 underline text-red"
              onClick={(e) => deleteBlog(blog, access_token, e.target)}>
              Delete
            </button> */}
          </div>
        </div>

        <div className="max-lg:hidden">
          <BlogStats stats={activity} />
        </div>
      </div>
      {showStats && (
        <div>
          <BlogStats stats={activity} />
        </div>
      )}
    </>
  );
};

export const ManageDraftCard = ({ blog }) => {
  let { blog_id, description, title, publishedAt, index } = blog;

  let {
    userAuth: { access_token },
  } = useContext(UserContext);

  index++;
  return (
    <>
      <div
        className="flex max-md:gap-5 gap-10 border-b mb-2 md:mb-6 max-md:px-0 border-grey pb-2 md:pb-6 max-md:items-start items-center"
        key={index}>
        <h1 className="blog-index text-center pl-0  md:pl-2 flex-none ">
          {index < 10 ? "0" + index : index}
        </h1>

        <div>
          <h1 className="blog-title  mb-2">{title}</h1>

          <p className="line-clamp-2 font-gelasio text-dark-grey">
            {description || "No Description"}
          </p>

          <div className="flex gap-6 max-md:mt-1 mt-3">
            <Link to={`/editor/${blog_id}`} className="pr-4 py-2 ">
              Edit
            </Link>

            <Button
              className="pr-4 py-2  text-red"
              onClick={(e) => deleteBlog(blog, access_token)}>
              Delete
            </Button>

            {/* <button
              className="pr-4 py-2 underline text-red"
              onClick={(e) => deleteBlog(blog, access_token)}>
              Delete
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

const deleteBlog = (blog, access_token, target) => {
  let { index, blog_id, setStateFunc } = blog;

  axios
    .post(
      import.meta.env.VITE_SERVER_DOMAIN + "/delete-blog",
      { blog_id },
      { headers: { Authorization: `Bearer ${access_token}` } }
    )
    .then(({ data }) => {
      setStateFunc((preVal) => {
        let { deletedDocCount, totalDocs, result } = preVal;

        result.splice(index, 1);

        if (!deletedDocCount) {
          deletedDocCount = 0;
        }

        if (!result.length && totalDocs - 1 > 0) {
          return null;
        }

        return {
          ...preVal,
          totalDocs: totalDocs - 1,
          deletedDocCount: deletedDocCount + 1,
        };
      });
    });
};
