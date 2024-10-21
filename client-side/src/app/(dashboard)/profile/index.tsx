"use client";
import Image from "next/image";
import profile from "/public/progile.png";
import edit from "@/assets/icons/edit.svg";
import Input from "@/app/components/input/input";
import Button from "@/app/components/button/button";
import useEditProfileValidation from "@/app/hooks/profile_hook";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  updateUser,
  resetErrorAndStatusUser,
} from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  profilePic: string;
}

const MainProfile = ({ user }: { user: User }) => {
  const dispatch: AppDispatch = useDispatch();
  const userSlice = useSelector((state: RootState) => state.user);
  const [profilePic, setProfilePic] = useState<any>(
    user.profilePic ? `http://localhost:8000/${user.profilePic}` : null || null
  );

  const handleFileChange = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setProfilePic(event.currentTarget.files[0]);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const { handleChange, values, validate, errors } = useEditProfileValidation({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  });


  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(
        updateUser({
          first_name: values.firstName,
          last_name: values.lastName,
          profilePicture: profilePic ? profilePic : "",
        })
      );
    }
  };

  useEffect(() => {
    if (userSlice.status === "succeeded") {
      dispatch(resetErrorAndStatusUser());
      toast.success("Data update successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (userSlice.status === "failed") {
      toast.error(userSlice.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(resetErrorAndStatusUser());
    }
  }, [dispatch, userSlice.error, userSlice.status]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[25px]  ml-8 p-8 flex flex-col w-[80%]"
      >
        <section className="  flex gap-12">
          <div className="relative">
            <Image
              className=" rounded-full w-[130px] h-[130px] object-cover"
              src={
                profilePic == null
                  ? profile
                  : typeof profilePic === "string"
                  ? profilePic
                  : URL.createObjectURL(profilePic)
              }
              height={130}
              width={130}
              alt="profile picture"
            />
            <div
              className="absolute bg-primary rounded-full p-2 top-20 -right-2 hover:cursor-pointer"
              onClick={handleClick}
            >
              <Image src={edit} alt="edit" height={15} width={15} />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[40%]">
            <Input
              label="First Name"
              type="text"
              placeholder="Edit your first name"
              defaultValue={user.firstName}
              error={errors.firstName}
              value={values.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Input
              label="Email"
              type="text"
              placeholder="Edit your email"
              value={user.email}
              readOnly
            />
          </div>
          <div className="w-[40%]">
            <Input
              label="Last Name"
              type="text"
              placeholder="Edit your last name"
              defaultValue={user.lastName}
              error={errors.lastName}
              value={values.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
        </section>
        <Button
          type="submit"
          className="w-[10rem] self-end"
          loading={false}
          text="Save"
        />
      </form>
    </>
  );
};

export default MainProfile;
