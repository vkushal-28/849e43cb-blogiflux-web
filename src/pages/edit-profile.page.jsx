import React, { useContext, useEffect, useRef } from "react";
import { UserContext } from "../App";
import { profileDataStructure } from "./profile.page";
import { useState } from "react";
import Loader from "../components/loader.component";
import AnimationWrapper from "../common/page-animation";
import InputBox from "../components/input.component";
import { uploadImage } from "../common/aws";
import toast from "react-hot-toast";
import { storeInSession } from "../common/session";
import {
  getProfileDetailsApi,
  updateProfileApi,
  updateProfileImageApi,
} from "../common/api";
import apiRequest from "../common/api/apiRequest";
import Button from "../common/button.component";

const EditProfile = () => {
  //  context data
  let {
    userAuth,
    userAuth: { username, access_token },
    setUserAuth,
  } = useContext(UserContext);

  let bioLimit = 150;

  // ref hooks
  const profileImgElement = useRef();
  const editProfileForm = useRef();

  // state variables
  const [profileData, setProfileData] = useState(profileDataStructure);
  const [loading, setLoading] = useState(true);
  const [charactersLeft, setCharactersLeft] = useState(bioLimit);
  const [updatedProfileImg, setupdatedProfileImg] = useState(null);

  const fetchProfileData = async () => {
    try {
      const { data } = await apiRequest("POST", getProfileDetailsApi, {
        username: username,
      });
      data && setProfileData(data);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, [access_token]);

  // destructure profileData obj
  const {
    personal_info: {
      fullname,
      username: profile_username,
      profile_img,
      email,
      bio,
    },
    social_links,
  } = profileData;

  const handleCharactersChange = (e) => {
    setCharactersLeft(bioLimit - e.target.value.length);
  };

  const handleImagePreview = (e) => {
    const img = e.target.files[0];

    profileImgElement.current.src = URL.createObjectURL(img);
    setupdatedProfileImg(img);
  };

  const handleImageUpload = async () => {
    if (updatedProfileImg) {
      await uploadImage(updatedProfileImg)
        .then(async (url) => {
          if (url) {
            console.log(url);
            try {
              const { data } = await apiRequest(
                "POST",
                updateProfileImageApi,
                {
                  url,
                },
                true
              );
              let newUserAuth = {
                ...userAuth,
                profile_img: data.profile_img,
              };

              storeInSession("user", JSON.stringify(newUserAuth));

              setUserAuth(newUserAuth);

              setupdatedProfileImg(null);
              toast.success("Uploaded  ");
            } catch (error) {
              console.error("Failed to fetch profile data:", error.response);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = async (e) => {
    let form = new FormData(editProfileForm.current);
    let formData = {};

    for (let [key, value] of form.entries()) {
      formData[key] = value;
    }

    let {
      username,
      bio,
      facebook,
      github,
      instagram,
      twitter,
      website,
      youtube,
    } = formData;

    if (username.length < 3) {
      return toast.error("Username should be atleasrt 3 letters long");
    }

    if (bio.length > bioLimit) {
      return toast.error(`Bio should not be more than ${bioLimit}`);
    }

    try {
      const { data } = await apiRequest(
        "POST",
        updateProfileApi,
        {
          username,
          bio,
          social_links: {
            youtube,
            facebook,
            github,
            instagram,
            twitter,
            website,
          },
        },
        true
      );
      if (userAuth.username !== data.username) {
        let newUserAuth = { ...userAuth, username: data.username };

        storeInSession("user", JSON.stringify(newUserAuth));
        setUserAuth(newUserAuth);
      }

      toast.success("Profile Updated");
    } catch (error) {
      console.error("Failed to fetch user data:", error.response);

      toast.error(error.response.data.error);
    }
  };

  return (
    <AnimationWrapper>
      {loading ? (
        <Loader />
      ) : (
        <form ref={editProfileForm}>
          <h1 className="max-md:hidden">Edit Profile</h1>
          <div className="flex flex-col lg:flex-row items-start py-10 gap-8 lg:gap-10">
            <div className="max-lg:center mb-5">
              <label
                htmlFor="uploadImg"
                className="relative block w-48 h-48 bg-grey rounded-full overflow-hidden">
                <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center text-white bg-black/30 opacity-0 hover:opacity-100 cursor-pointer">
                  Upload Image
                </div>
                <img ref={profileImgElement} src={profile_img} alt="" />
              </label>
              <input
                type="file"
                id="uploadImg"
                accept=".jpeg, .jpg, .png"
                hidden
                onChange={handleImagePreview}
              />
              <Button
                className="btn-light mt-5 max-lg:center min-w-full lg:w-full px-10"
                onClick={(e) => handleImageUpload(e)}
                loadingText="Uploading...">
                Upload
              </Button>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5">
                <div>
                  <InputBox
                    name="fullname"
                    type="text"
                    value={fullname}
                    placeholder="Full Name"
                    disable={true}
                    icon="fi fi-rr-user"
                  />
                </div>
                <div>
                  <InputBox
                    name="email"
                    type="email"
                    value={email}
                    placeholder="Email"
                    disable={true}
                    icon="fi fi-rr-envelope"
                  />
                </div>
              </div>
              <InputBox
                name="username"
                type="text"
                value={profile_username}
                placeholder="Username"
                icon="fi fi-rr-at"
              />
              <p className="text-dark-grey -mt-3">
                Username will use to search user and will be visible to all
                users
              </p>

              <textarea
                name="bio"
                maxLength={bioLimit}
                className="input-box h-64 lg:h-40 resize-none leading-7 mt-5 pl-5"
                defaultValue={bio}
                placeholder="bio"
                onChange={handleCharactersChange}
              />
              <p className="mt-1 text-dark-grey">
                {charactersLeft} Characters Left{" "}
              </p>

              <p className="my-6 text-dark-grey">
                Add your social handles below
              </p>

              <div className="md:grid md:grid-cols-2 gap-x-6">
                {Object.keys(social_links).map((key, i) => {
                  let link = social_links[key];

                  return (
                    <InputBox
                      key={i}
                      name={key}
                      type="text"
                      value={link}
                      placeholder="https://"
                      icon={
                        "fi " +
                        (key !== "website"
                          ? " fi-brands-" + key
                          : "fi-rr-globe ")
                      }
                    />
                  );
                })}
              </div>

              <Button
                className="btn-dark w-auto px-10"
                onClick={(e) => handleSubmit(e)}
                loadingText="Updating...">
                Update
              </Button>
            </div>
          </div>
        </form>
      )}
    </AnimationWrapper>
  );
};

export default EditProfile;
