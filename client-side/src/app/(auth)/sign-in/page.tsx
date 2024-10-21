"use client";
import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import useSignInFormValidation from "@/app/hooks/sign_in_hook";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login, resetErrorAndStatus } from "@/lib/features/auth/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const { handleChange, values, validate, errors } = useSignInFormValidation({
    email: "",
    password: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(login({ email: values.email, password: values.password }));
    }
  };

  useEffect(() => {
    if (auth.status === "succeeded") {
      dispatch(resetErrorAndStatus());
      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        if (auth.user?.isVerified === false) {
          router.push("/verify-email");
        } else {
          router.push("/home");
        }
      }, 2000);
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
            Sign in to your account
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

          <div className="mb-12">
            <Input
              label="Passowrd"
              isPassword={true}
              placeholder="Enter your password"
              error={errors.password}
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
              isForGetPassword={true}
            />
          </div>
          <Button
            type="submit"
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
  );
};

export default SignIn;
