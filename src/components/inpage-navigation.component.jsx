import React, { useRef, useState, useEffect } from "react";

export let activeTabLineRef;
export let activeTabRef;

const InPageNavigation = React.memo(
  ({ children, routes, defaultHidden, defaultActiveIndex = 0 }) => {
    activeTabLineRef = useRef();
    activeTabRef = useRef();

    const [inPageNavIndex, setInPageNavIndex] = useState(defaultActiveIndex);
    const [width, setWidth] = useState(window.innerWidth);
    const [isResizeEventAdded, setIsResizeEventAdded] = useState(false);

    const changePageState = (btn, i) => {
      const { offsetWidth, offsetLeft } = btn;

      activeTabLineRef.current.style.width = offsetWidth + "px";
      activeTabLineRef.current.style.left = offsetLeft + "px";

      setInPageNavIndex(i);
    };

    useEffect(() => {
      const pathname = window.location.pathname;

      if (width > 766 && inPageNavIndex !== defaultActiveIndex) {
        changePageState(activeTabRef.current, defaultActiveIndex);
      }

      if (pathname !== "/" && inPageNavIndex == defaultActiveIndex) {
        changePageState(activeTabRef.current, defaultActiveIndex);
      }

      if (pathname == "/" && !isResizeEventAdded) {
        window.addEventListener("resize", () => {
          if (!isResizeEventAdded) {
            setIsResizeEventAdded(true);
          }
          setWidth(window.innerWidth);
        });
      }
    }, [width]);

    return (
      <>
        <div className="relative mb-4 md:mb-8 bg-white border-b border-grey flex flex-nowrap overflow-x-auto">
          {routes.map((route, i) => {
            return (
              <button
                ref={i == defaultActiveIndex ? activeTabRef : null}
                key={i}
                className={`p-4 px-5 capitalize ${
                  inPageNavIndex == i ? "text-black" : "text-dark-grey "
                } ${
                  defaultHidden &&
                  defaultHidden.includes(route) &&
                  " md:hidden "
                }`}
                onClick={(e) => {
                  changePageState(e.target, i);
                }}>
                {route}
              </button>
            );
          })}
          <hr
            ref={activeTabLineRef}
            className="absolute  border-dark-grey  bottom-0 duration-300"
          />
        </div>
        {Array.isArray(children) ? children[inPageNavIndex] : children}
      </>
    );
  }
);

export default InPageNavigation;
