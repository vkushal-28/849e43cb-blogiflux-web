import React, { useState } from "react";

const InputBox = ({
  name,
  type,
  id,
  value,
  placeholder,
  icon,
  disable = false,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-[100%] mb-4">
      <input
        name={name}
        disabled={disable}
        type={type === "password" && passwordVisible ? "text" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box rounded-lg"
      />
      <i className={"fi " + icon + " input-icon"} />

      {type === "password" ? (
        <i
          className={
            "fi fi-rr-eye" +
            (!passwordVisible ? "-crossed" : "") +
            " input-icon left-[auto] right-4 cursor-pointer"
          }
          onClick={() => setPasswordVisible((currentVal) => !currentVal)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default InputBox;
