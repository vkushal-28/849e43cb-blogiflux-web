import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Image = ({ src, alt, type, className }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <>
      {!loaded && (
        <Skeleton className={className} count={1} /> // Five-line loading skeleton
      )}
      <img
        src={src}
        alt={alt}
        className={`object-cover overflow-hidden transition-opacity duration-500 ease-in-out  ${className} ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        onLoad={handleImageLoad}
        loading="lazy"
      />
    </>
  );
};

export default Image;
