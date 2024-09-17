import React, { useContext } from "react";
import lightPageNotFoundImg from "../imgs/404-light.png";
import darkPageNotFoundImg from "../imgs/404-dark.png";
import lightFullLogo from "../imgs/full-logo-light.png";
import darkFullLogo from "../imgs/full-logo-dark.png";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const PageNotFound = () => {
  // Context Data
  const { theme } = useContext(ThemeContext);

  return (
    <section className="h-cover relative p-10 flex flex-col items-center gap-20 text-center">
      <img
        src={theme == "light" ? darkPageNotFoundImg : lightPageNotFoundImg}
        alt="page-not-found-image"
        className="select-none border-grey w-72 aspect-square object-cover rounded border-2"
      />
      <h1 className="text-4xl font-gelasio leading-7">Page not found</h1>
      <p className="text-dark-grey text-xl leading-7 mt-8">
        The page you are looking for does not exists.Head back to the{" "}
        <Link to="/" className="text-black underline">
          home page
        </Link>
      </p>
      <div className="mt-auto">
        <img
          src={theme == "light" ? darkFullLogo : lightFullLogo}
          alt="blogiflux-logo"
          className="h-12 object-contain block mt-auto select-none"
        />
        <p className="mt-5 text-dark-grey">
          Read millions of stories around the world{" "}
        </p>
      </div>
    </section>
  );
};

export default PageNotFound;
