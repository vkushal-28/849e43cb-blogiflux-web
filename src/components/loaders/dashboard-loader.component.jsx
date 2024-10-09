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
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <div
          className={`p-1 py-4 md:px-4 lg:px-6 border-b border-grey border-l-black`}>
          <div className="flex gap-5 mb-3">
            <Skeleton
              count={1}
              className="rounded-full w-10 h-10 lg:w-14 lg:h-14"
            />
            <div className="w-full">
              <Skeleton
                count={1}
                height={12}
                className="w-[100%]  lg:w-[60%] mt-3"
              />
              <Skeleton count={1} height={12} className="w-[70%]  lg:w-[40%]" />
            </div>
          </div>

          {type == "comment" ? (
            <p className="ml-14 pl-5 font-gelasio text-xl mb-7">
              <Skeleton count={1} height={50} className="w-[80%]  lg:w-[40%]" />
            </p>
          ) : null}

          {type == "all" || type == "reply" ? (
            <>
              <p className="ml-14 pl-1 lg:pl-5 font-gelasio text-xl mb-7">
                <Skeleton
                  count={1}
                  height={50}
                  className="w-[80%]  lg:w-[50%]"
                />
              </p>
              <p className="ml-14 pl-5 font-gelasio text-xl mb-5">
                <Skeleton
                  count={1}
                  height={12}
                  className="w-[70%]  lg:w-[40%]"
                />
              </p>
            </>
          ) : null}
          <div className="ml-14 pl-5 mt-3  flex gap-5">
            <Skeleton count={1} width={70} height={20} />
            {type !== "like" && (
              <>
                <Skeleton count={1} width={70} height={20} />
                <Skeleton count={1} width={70} height={20} />
              </>
            )}
          </div>
        </div>
      ))}
    </SkeletonTheme>
  );
};

export const NotificationCategoryLoader = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <SkeletonTheme
      baseColor={`${theme == "dark" ? "#212830" : "#eceeef"}`}
      highlightColor={`${theme == "dark" ? "#1b2026" : "#dfe5e8"}`}>
      <div className=" flex gap-2 lg:gap-6">
        {Array.apply(null, { length: 4 }).map((e, i) => (
          <Skeleton count={1} width={80} height={35} className="rounded-full" />
        ))}
      </div>
    </SkeletonTheme>
  );
};
