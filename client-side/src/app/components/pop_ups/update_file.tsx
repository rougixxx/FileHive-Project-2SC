"use client";
import Modal from "./modal";
import Input from "../input/input";
import Button from "../button/button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { updateDocument } from "@/lib/features/documents/documentSlice";
import { useState } from "react";
import useUpdateFile from "@/app/hooks/update_file_hook";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  defaultValue: string;
  fileId: string;
}
const UpdateFileModel = ({
  isOpen,
  onClose,
  isLoading,
  fileId,
  defaultValue,
}: UploadModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [title, setTitle] = useState(defaultValue);
  const { handleChange, values, validate, errors } = useUpdateFile({
    title: "",
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (validate(values)) {
      dispatch(updateDocument({ id: fileId, title: title })).then(() => {
        setTimeout(() => {
          window.location.reload();
        }, 2000); // 2000 milliseconds = 2 seconds
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          onClose();
        }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2>Update the file</h2>
          <Input
            onChange={(e) => {
              setTitle(e.target.value);
              handleChange("title", e.target.value);
            }}
            error={errors.title}
            label="File name"
            placeholder="Enter file name"
            defaultValue={defaultValue}
          />
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
              text="Submit"
            />
          </div>
        </form>
      </Modal>
    </>
  );
};

export default UpdateFileModel;
