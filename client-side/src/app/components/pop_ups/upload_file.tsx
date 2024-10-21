"use client";
import Image from "next/image";
import upload from "@/assets/icons/upload.svg";
import Modal from "./modal";
import Input from "../input/input";
import Button from "../button/button";
import { useState, useRef } from "react";
import { addDocument } from "@/lib/features/documents/documentSlice";
import { AppDispatch, RootState } from "@/lib/store";

import { useDispatch, useSelector } from "react-redux";
import useUploadFile from "@/app/hooks/upload_file_hook";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
}
const UploadFileModel = ({ isOpen, onClose, isLoading }: UploadModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { handleChange, values, validate, errors } = useUploadFile({
    title: "",
    file: null,
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(addDocument({ file: file, title: title })).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }
  };
  const [title, setTitle] = useState("");
  const fileInputRef = useRef<any>(null);
  const [file, setFile] = useState<any>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    setFile(file);
    handleChange("file", file);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <h2>Upload a file</h2>
            <Input
              error={errors.title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleChange("title", e.target.value);
              }}
              label="File name"
              placeholder="Enter file name"
            />
            <div
              onClick={handleDivClick}
              className="border-2 border-primary border-dashed rounded-[5px] flex flex-col justify-center items-center  py-8  hover:cursor-pointer "
            >
              <Image src={upload} height={54} width={54} alt="upload" />
              <p className="text-primary text-lg">Upload a file</p>
              <p className="text-gray">
                {errors.file !== null
                  ? errors.file
                  : file != null
                  ? file.name
                  : "Drag and drop"}
              </p>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </div>
            <div className="flex gap-4 items-center ">
              <button
                onClick={() => {
                  onClose();
                }}
                className="h-[45px] w-[50%] text-sm text-blackText border-[2px] rounded-[5px] border-blackText px-6 py-2 hover:bg-blackText hover:text-white transition-all duration-500"
              >
                Cancel
              </button>
              <Button
                type="submit"
                className="w-[50%]"
                loading={isLoading}
                text="Upload"
              />
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UploadFileModel;
