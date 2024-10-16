import React, { useContext, useEffect } from "react";
import darkLogo from "../imgs/logo-dark.png";
import lightLogo from "../imgs/logo-light.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ThemeContext, UserContext } from "../App";
import UserNavigation from "./user-navigation.component";
import axios from "axios";
import { storeInSession } from "../common/session";
import Button from "../common/button.component";

const Navbar = () => {
  const navigate = useNavigate();

  const { theme, setTheme } = useContext(ThemeContext);

  const [openSearchBox, setOpenSearchBox] = useState(false);
  const [userNavPanel, setUserNavPanel] = useState(false);

  const {
    userAuth,
    userAuth: {
      access_token,
      profile_img,
      new_notification_available,
      isAdmin,
    },
    setUserAuth,
  } = useContext(UserContext);

  useEffect(() => {
    if (access_token) {
      axios
        .get(import.meta.env.VITE_SERVER_DOMAIN + "/new-notification", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then(({ data }) => {
          setUserAuth({ ...userAuth, ...data });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [access_token]);

  const handleUserNavPanel = () => {
    setUserNavPanel((currentVal) => !currentVal);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setUserNavPanel(false);
    }, 200);
  };

  const handleSearch = (e) => {
    let query = e.target.value;

    if (e.keyCode == 13 && query.length) {
      navigate(`/search/${query}`);
      setOpenSearchBox((currentVal) => !currentVal);
    }
  };

  const changeTheme = (e) => {
    let newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
    storeInSession("theme", newTheme);
  };

  return (
    <>
      <nav className="navbar z-50 max-lg:h-[5rem]">
        <Link to="/" className="flex-none w-14">
          <img
            src={theme == "light" ? darkLogo : lightLogo}
            className="w-full"
            alt="logo"
          />
        </Link>
        <div
          className={
            "absolute  w-full left-0 bg-white top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:show " +
            (openSearchBox ? "show" : "hide")
          }>
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-12"
            onKeyDown={handleSearch}
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-dark-grey" />
        </div>
        <div className="flex items-center gap-3 md:gap-6 ml-auto">
          <Button
            className="md:hidden bg-grey w-12 h-12 rounded-full flex items-center justify-center"
            onClick={() => setOpenSearchBox((currentVal) => !currentVal)}>
            <i className="fi fi-rr-search text-xl"></i>
          </Button>

          {/* {isAdmin && ( */}
          <Link
            to="/editor"
            className="hidden md:flex gap-2  link rounded-full">
            <i className="fi fi-rr-file-edit"></i>
            <p>write</p>
          </Link>
          {/* )} */}

          <Button
            className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10"
            onClick={changeTheme}>
            <i
              className={`fi fi-rr-${
                theme == "light" ? "moon-stars" : "sun"
              } text-2xl block mt-1 `}
            />
          </Button>

          {access_token ? (
            <>
              <Link to="/dashboard/notifications">
                <button className="w-12 h-12 rounded-full bg-grey relative hover:bg-black/10">
                  <i className="fi fi-rr-bell text-xl block mt-1 " />
                  {new_notification_available && (
                    <span className="bg-red w-3 h-3 rounded-full absolute z-10 top-2 right-2"></span>
                  )}
                </button>
              </Link>

              <div
                className="relative"
                onClick={handleUserNavPanel}
                onBlur={handleBlur}>
                <Button className="w-12 h-12 mt-1">
                  <img
                    src={profile_img}
                    className="w-full h-full object-cover rounded-full"
                    alt="profile-image"
                  />
                </Button>
              </div>

              {userNavPanel && <UserNavigation />}
            </>
          ) : (
            <>
              <Link to="/signin" className="btn-dark py-2">
                Sign In
              </Link>
              <Link to="/signup" className="btn-light py-2 hidden md:block">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
