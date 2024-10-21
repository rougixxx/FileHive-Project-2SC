import React, { InputHTMLAttributes } from "react";
import Link from "next/link";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  placeholder: string;
  className?: string;
  error?: string;
  isPassword?: boolean;
  isForGetPassword?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  placeholder,
  className,
  error,
  isPassword,
  isForGetPassword,
  ...props
}) => {
  return (
    <>
    <div className="flex flex-col">
      <div className="flex justify-between">
        <p className="text-textColor py-1">{label}</p>
        {isForGetPassword && (
          <Link href={'/forgot-password'}>
            <p className="text-primary text-sm py-1 hover:cursor-pointer">
              Forgot your password ?
            </p>
          </Link>
        )}
      </div>
      <input
        className={` h-[45px]  px-2 rounded-[5px] border-[1.5px] text-blueText  ${
          !error
            ? "border-blueText border-opacity-40 focus:border-primary focus:outline-primary"
            : "border-red-500 focus:border-primary focus:outline-red-500"
        } ${className}`}
        type={isPassword ? "password" : "text"}
        placeholder={placeholder}
        {...props}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
      
    </>
  );
};

export default Input;
