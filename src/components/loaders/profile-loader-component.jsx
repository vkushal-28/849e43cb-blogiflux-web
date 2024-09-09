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
      baseColor={`${theme == "dark" ? "#303030" : "#F3F3F3"}`}
      highlightColor={`${theme == "dark" ? "#2A2A2A" : "#e6e6e6"}`}>
      {Array.apply(null, { length: 5 }).map((e, i) => (
        <section className="h-cover md:flex flex-row-reverse items-start gap-5 min-[1100px]:gap-12">
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
