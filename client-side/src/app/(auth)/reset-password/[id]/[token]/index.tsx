"use client";
import Button from "@/app/components/button/button";
import Image from "next/image";
import useResetPasswordFormValidation from "@/app/hooks/reset_password_hook";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  resetPassword,
  resetErrorAndStatusUser,
} from "@/lib/features/user/userSlice";
import { login } from "@/lib/features/auth/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "@/app/components/input/input";
import Link from "next/link";

const ResetPasswordComp = ({ email }: { email: string }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { handleChange, values, validate, errors } =
    useResetPasswordFormValidation({
      password: "",
      confirmPassword: "",
    });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(
        resetPassword({
          email: email,
          password: values.password,
        })
      );
    }
  };

  useEffect(() => {
    if (user.status === "succeeded") {
      dispatch(resetErrorAndStatusUser());
      toast.success("Password updated successfuly!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(login({ email: email, password: values.password })).then(() => {
        dispatch(resetErrorAndStatusUser());
        router.push("/home");
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
  }, [user.error, user.status, dispatch, router, values.password]);
  return (
    <>
      {" "}
      <div className="flex flex-col min-h-screen justify-between bg-background">
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center justify-center"
        >
          <Image
            className="my-12 "
            width={150}
            height={80}
            src={"/logo.png"}
            alt="file-hive"
          />
          <div className="bg-white rounded-[15px] shadow-custom flex flex-col p-8 min-w-[450px] mb-12">
            <h1 className="text-blackText text-lg mb-4">
              Reset your account password
            </h1>
            <div className="mb-6">
              <Input
                className=" hover:cursor-not-allowed"
                label="Email"
                placeholder="example@gmail.com"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-6">
              <Input
                label="New Passowrd"
                isPassword={true}
                placeholder="Enter your new password"
                error={errors.password}
                value={values.password}
                onChange={(e) => handleChange("password", e.target.value)}
                isForGetPassword={false}
              />
            </div>
            <div className="mb-6">
              <Input
                label="Confirm Passowrd"
                isPassword={true}
                placeholder="Confirm your new password"
                error={errors.confirmPassword}
                value={values.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                isForGetPassword={false}
              />
            </div>

            <Button
              type="submit"
              className="mb-6"
              loading={user.status === "loading"}
              text="Reset Password"
            />
          </div>
          <p className="text-blackText">
            Don&apos;t have an account ?{" "}
            <span className="text-primary">
              <Link href={"/sign-up"}>Sign up</Link>{" "}
            </span>
          </p>
        </form>
        <p className="text-blueText text-xs flex justify-center py-4">
          © FileHive
        </p>
      </div>
    </>
  );
};

export default ResetPasswordComp;
