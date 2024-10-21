"use client";
import Link from "next/link";
import Button from "@/app/components/button/button";
import Input from "@/app/components/input/input";
import Image from "next/image";
import useSignUpFormValidation from "@/app/hooks/sign_up_hook";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { signup, resetErrorAndStatus } from "@/lib/features/auth/authSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { useRouter } from "next/navigation";

const SignUp = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const { handleChange, values, validate, errors } = useSignUpFormValidation({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(
        signup({
          email: values.email,
          first_name: values.firstName,
          last_name: values.lastName,
          password: values.password,
        })
      );
    }
  };

  useEffect(() => {
    if (auth.status === "succeeded") {
      toast.success("Register successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => {
        dispatch(resetErrorAndStatus());
        router.push("/verify-email");
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
        <div className="bg-white rounded-[15px] shadow-custom flex flex-col p-8 max-w-[450px] mb-12">
          <h1 className="text-blackText text-lg mb-4">Create a new account</h1>
          <div className="mb-6">
            <Input
              label="Email"
              placeholder="example@gmail.com"
              error={errors.email}
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>

          <div className="flex mb-6 justify-between gap-8">
            <Input
              className="w-[170px]"
              label="First Name"
              placeholder="first name..."
              error={errors.firstName}
              value={values.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Input
              className="w-[170px]"
              label="Last Name"
              placeholder="last name..."
              error={errors.lastName}
              value={values.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
          </div>
          <div className="mb-6">
            <Input
              label="Passowrd"
              isPassword={true}
              placeholder="Enter your password"
              error={errors.password}
              value={values.password}
              onChange={(e) => handleChange("password", e.target.value)}
            />
          </div>
          <div className="mb-12">
            <Input
              label="Confirm Passowrd"
              isPassword={true}
              placeholder="Confirm your password"
              error={errors.confirmPassword}
              value={values.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
          </div>

          <Button
            type="submit"
            className="mb-6"
            loading={auth.status === "loading"}
            text="Create account"
          />
        </div>
        <p className="text-blackText">
          Already have an account ?{" "}
          <span className="text-primary">
            <Link href={"/sign-in"}>Sign in</Link>
          </span>
        </p>
      </form>
      <p className="text-blueText text-xs flex justify-center py-4">
        © FileHive
      </p>
    </div>
  );
};

export default SignUp;
