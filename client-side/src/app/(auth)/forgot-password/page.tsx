"use client";
import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import useForgotEmailFormValidation from "@/app/hooks/forget_email_hook";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  sendResetPassword,
  resetErrorAndStatus,
} from "@/lib/features/auth/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const { handleChange, values, validate, errors } =
    useForgotEmailFormValidation({
      email: "",
    });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(sendResetPassword(values.email));
    }
  };

  useEffect(() => {
    if (auth.status === "succeeded") {
      dispatch(resetErrorAndStatus());
      toast.success("Email has been sent successfuly!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (auth.status === "failed") {
      toast.error(auth.error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      dispatch(resetErrorAndStatus());
    }
  }, [auth.error, auth.status, auth.user?.isVerified, dispatch, router]);

  return (
    <>
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
          <div className="bg-white rounded-[15px] shadow-custom flex flex-col p-8 max-w-[450px] mb-12">
            <h1 className="text-blackText text-lg mb-4">
              Enter your email address below and we will send you a link to
              reset or create your password.
            </h1>
            <div className="mb-6">
              <Input
                label="Email"
                placeholder="example@gmail.com"
                error={errors.email}
                value={values.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </div>
            <Button
              className="mb-6"
              loading={auth.status === "loading"}
              text="Continue"
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

export default ForgotPassword;
