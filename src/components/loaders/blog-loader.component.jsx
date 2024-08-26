import React, { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../../App";
import "react-loading-skeleton/dist/skeleton.css";

export const BlogListLoader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#2A2A2A" : "#F3F3F3"}`}
      highlightColor={`${theme == "dark" ? "#303030" : "#e6e6e6"}`}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div
          className="flex gap-8 items-center border-b border-grey pb-7 mb-5"
          key={i}>
          <div className="w-full">
            <div className="flex gap-2 items-center mb-4">
              <Skeleton
                count={1}
                height={22}
                width={22}
                className="rounded-full"
              />
              <p>
                <Skeleton count={1} height={13} width={300} />
              </p>
            </div>

            <h1 className="blog-title ">
              <Skeleton count={1} width={"60%"} height={25} />
            </h1>

            <p className="my-3  max-sm:hidden md:max-[1100px]:hidden ">
              <Skeleton count={1} width={"90%"} height={15} />
            </p>

            <div className="flex gap-4 mt-7">
              <Skeleton count={1} width={90} height={30} />
              <Skeleton count={1} width={90} height={30} />
              <Skeleton count={1} width={90} height={30} />
            </div>
          </div>
          <div className="h-28 aspect-square ">
            <Skeleton count={1} height={100} />
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};
