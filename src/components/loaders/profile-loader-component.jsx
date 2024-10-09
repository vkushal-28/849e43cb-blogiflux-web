import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeContext } from "../../App";
import "react-loading-skeleton/dist/skeleton.css";

export const ProfileDetailsLoader = () => {
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
        <section
          className="h-cover md:flex flex-row-reverse items-start max-md:gap-2 gap-3 min-[1100px]:gap-12"
          key={i}>
          <div className="flex flex-col max-md:items-center gap-2 min-w-[250px]">
            <Skeleton
              count={1}
              height={170}
              width={170}
              className="rounded-full"
            />

            <Skeleton count={1} height={25} width={250} className="my-3" />
            <Skeleton count={1} height={15} width={200} className="mb-3" />
            <Skeleton count={1} height={15} width={290} className="mb-3" />
            <Skeleton count={1} height={40} width={120} className="mb-3" />
            <Skeleton count={1} height={15} width={250} className="mb-5" />
          </div>
        </section>
      ))}
    </SkeletonTheme>
  );
};
