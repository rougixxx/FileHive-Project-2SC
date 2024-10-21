"use client";
import Input from "@/app/components/input/input";
import Button from "@/app/components/button/button";
import useUpdatePasswordFormValidation from "@/app/hooks/update_password_hook";
import {
  updatePassword,
  resetErrorAndStatusUser,
} from "@/lib/features/user/userSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Settings = () => {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { handleChange, values, validate, errors } =
    useUpdatePasswordFormValidation({
      password: "",
      newPassword: "",
    });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(
        updatePassword({
          old_password: values.password,
          new_password: values.newPassword,
        })
      );
    }
  };
  useEffect(() => {
    if (user.status === "succeeded") {
      dispatch(resetErrorAndStatusUser());
      toast.success("Password update successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (user.status === "failed") {
      toast.error(user.error, {
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
  }, [dispatch, user.error, user.status]);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-[25px]  ml-8 p-8 flex flex-col w-[60%]"
      >
        <h3 className="py-4 text-blueText text-xl">Change password</h3>
        <div className=" flex gap-12">
          <div className="flex flex-col gap-4 w-[50%]">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter your current password"
              isPassword={true}
              error={errors.password}
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter your new password"
              isPassword={true}
              error={errors.newPassword}
              value={values.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-[10rem] mt-16 self-end"
          loading={user.status === "loading"}
          text="Save"
        />
      </form>
    </>
  );
};

export default Settings;
