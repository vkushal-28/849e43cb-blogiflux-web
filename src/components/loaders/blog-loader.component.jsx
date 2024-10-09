import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../../App";
import "react-loading-skeleton/dist/skeleton.css";

export const BlogListLoader = () => {
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div
          className="flex gap-8 items-start border-b border-grey pb-6 mb-5"
          key={i}>
          <div className="w-full">
            <div className="flex gap-2 items-start mb-2">
              <Skeleton
                count={1}
                height={22}
                width={22}
                className="rounded-full"
              />
              <p className="mt-1">
                <Skeleton count={1} height={13} width={150} />
              </p>
            </div>

            <h1 className="blog-title ">
              <Skeleton count={1} width={"70%"} height={20} />
            </h1>

            <p className="my-3   max-sm:hidden md:max-[1100px]:hidden ">
              <Skeleton count={1} width={"100%"} height={12} />
              <Skeleton count={1} width={"80%"} height={12} />
            </p>

            <div className="flex gap-4 mt-5">
              <Skeleton
                count={1}
                width={80}
                height={25}
                className="rounded-full"
              />
              <Skeleton
                count={1}
                width={80}
                height={25}
                className="rounded-full"
              />
            </div>
          </div>
          <div className="h-28 aspect-square pt-8">
            <Skeleton count={1} height={100} className="rounded-lg" />
          </div>
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
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      {Array.apply(null, { length: 7 }).map((e, i) => (
        <div className="flex gap-5 items-start mb-7" key={i}>
          <h1 className="">
            <Skeleton count={1} height={40} width={40} />
          </h1>

          <div className="w-full">
            <div className="flex gap-2 items-center mb-2">
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

export const PublishedBlogLoader = ({ draft = false }) => {
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div
          className={`w-full flex gap-10  ${
            width <= 1024 && "gap-0"
          } border-b mb-6 max-md:px-4 border-grey pb-6 items-center`}
          key={i}>
          {draft ? (
            <Skeleton
              count={1}
              height={50}
              width={50}
              className="rounded-lg max-md:hidden"
            />
          ) : (
            <Skeleton
              count={1}
              height={100}
              width={100}
              className={`rounded-lg max-lg:hidden ${
                width <= 1024 && "hidden"
              }`}
            />
          )}
          <div className="flex flex-col justify-between py-2 w-full min-w-[300px] md:min-w-[50px] lg:min-w-[200px] ">
            <Skeleton count={1} height={22} className="mb-4 lg:w-[100%]" />
            <Skeleton count={1} height={13} className="w-[60%] xl:w-[40%]" />

            <div className="flex gap-6 mt-3">
              <Skeleton count={1} height={25} width={60} />
              <Skeleton count={1} height={25} width={60} />
              <Skeleton
                count={1}
                height={25}
                width={60}
                className="md:hidden"
              />
            </div>
          </div>
          <div className="max-lg:hidden" hidden={draft}>
            <div className="flex gap-2 max-lg:mb-6 border-grey max-lg:border-b">
              {Array.apply(null, { length: 3 }).map((e, i) => (
                <div
                  className={`flex flex-col items-center h-full justify-center p-2 px-4  ${
                    i !== 0 && "border-grey border-l "
                  }`}
                  key={i}>
                  <h1 className="text-xl lg:text-2xl mb-2">
                    <Skeleton count={1} height={25} width={25} />
                  </h1>
                  <p className="max-lg:text-dark-grey capitalize">
                    <Skeleton count={1} height={13} width={60} />
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export const DraftBlogLoader = ({ draft = false }) => {
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      {Array.apply(null, { length: 5 }).map((e, index) => (
        <div
          className="flex gap-10 border-b mb-6 max-md:px-4 border-grey pb-6 items-center"
          key={index}>
          <Skeleton count={1} height={50} width={50} />

          <div className="w-full">
            <Skeleton count={1} height={25} className="mb-3 w-100" />

            <p className="line-clamp-2 font-gelasio">
              <Skeleton
                count={1}
                height={13}
                className="w-[50%] md:w-[40%] lg:w-[30%]"
              />
            </p>

            <div className="flex gap-6 mt-3">
              <Skeleton count={1} height={25} width={60} />
              <Skeleton count={1} height={25} width={60} />
            </div>
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export const TagsLoader = ({ draft = false }) => {
  const { theme } = useContext(ThemeContext);

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, [width]);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      {Array.apply(null, { length: 6 }).map((e, i) => (
        <div className={`tag h-12 w-32`} key={i}></div>
      ))}
    </SkeletonTheme>
  );
};
