import React, { useState } from "react";

const Button = ({
  onClick,
  className,
  loadingText = "Please wait...",
  children,
  key = null,
  ref = null,
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (onClick) {
        await onClick();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      ref={ref}
      key={key}
      className={`${className} ${loading ? "cursor-not-allowed" : ""}`}
      disabled={loading}>
      {loading ? (
        <div className="flex gap-1 items-center ">
          {loadingText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 50 50"
            className="animate-spin h-5 w-5">
            <circle
              className="opacity-25"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"></circle>
            <circle
              className="opacity-75"
              cx="25"
              cy="25"
              r="20"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="80"
              strokeDashoffset="60"></circle>
          </svg>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
