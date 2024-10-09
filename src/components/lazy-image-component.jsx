import React, { useContext, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeContext } from "../App";

const Image = ({ src, alt, type, className }) => {
  const [loaded, setLoaded] = useState(false);

  const { theme } = useContext(ThemeContext);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <SkeletonTheme
          baseColor={`${theme == "dark" ? "#212830" : "#F3F3F3"}`}
          highlightColor={`${theme == "dark" ? "#1b2026" : "#e6e6e6"}`}>
          <Skeleton className={`${className}`} count={1} />
        </SkeletonTheme>
      )}
      <img
        src={src}
        alt={alt}
        className={` overflow-hidden transition-opacity duration-500 ease-in-out  ${className} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </>
  );
};

export default Image;
