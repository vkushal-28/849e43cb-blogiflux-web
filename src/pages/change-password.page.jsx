import React, { useRef } from "react";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import toast from "react-hot-toast";
import apiRequest from "../common/api/apiRequest";
import { changePasswordApi } from "../common/api";
import Button from "../common/button.component";

const ChangePassword = () => {
  // ref hooks
  const changePwdForm = useRef();

  let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

  const handleSubmit = async (e) => {
    let form = new FormData(changePwdForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let { currentPassword, newPassword } = formData;

    if (!currentPassword.length || !newPassword.length) {
      return toast.error("Fill all the inputs");
    }
    if (
      !passwordRegex.test(currentPassword) ||
      !passwordRegex.test(newPassword)
    ) {
      return toast.error(
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters"
      );
    }

    try {
      const { data } = await apiRequest(
        "POST",
        changePasswordApi,
        formData,
        true
      );
      toast.success(data.message);
    } catch (error) {
      console.error("Failed to change the user password:", error);
      return toast.error(error.response.data.error);
    }
  };

  return (
    <AnimationWrapper>
      <form ref={changePwdForm}>
        <h1>ChangePassword</h1>
        <div className="py-10 w-full md:max-w-[400px]">
          <InputBox
            className="profile-edit-input"
            name="currentPassword"
            type="password"
            placeholder="Current Password"
            icon={"fi fi-rr-unlock"}></InputBox>

          <InputBox
            className="profile-edit-input"
            name="newPassword"
            type="password"
            placeholder="New Password"
            icon={"fi fi-rr-unlock"}></InputBox>

          <Button className="btn-dark px-10" onClick={(e) => handleSubmit(e)}>
            Change Password
          </Button>
        </div>
      </form>
    </AnimationWrapper>
  );
};

export default ChangePassword;
