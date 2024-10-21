"use client";
import { useState } from "react";
import Image from "next/image";
import pdf from "@/assets/files/pdf.svg";
import img from "@/assets/files/image.png";
import word from "@/assets/files/word.svg";
import excel from "@/assets/files/excel.png";
import powerPoint from "@/assets/files/power_point.svg";
import fileIcon from "@/assets/files/file.png";
import txt from "@/assets/files/txt.png";
import FileActionButton from "./file_action_button";
import edit from "@/assets/icons/edit_file.svg";
import view from "@/assets/icons/view.svg";
import download from "@/assets/icons/download.svg";
import deleteFile from "@/assets/icons/delete.svg";
import share from "@/assets/icons/link.svg";
import UpdateFileModel from "../pop_ups/update_file";
import ConfirmationModel from "../pop_ups/confirmation";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const FileComponent = ({
  title,
  uploadDate,
  lastModification,
  fileType,
  link,
  fileId,
  isLoading,
  onDelete,
  file_size,
}: {
  file_size: string;
  title: string;
  uploadDate: string;
  lastModification: string;
  fileType: string;
  link: string;
  fileId: string;
  isLoading: boolean;
  onDelete: () => Promise<void>;
}) => {
  const handleDownload = (url: string, filename: string) => {
    axios
      .get(url, {
        responseType: "blob",
      })
      .then((res: any) => {
        fileDownload(res.data, filename);
      });
  };

  let icon;
  switch (fileType) {
    case "pdf":
      icon = pdf;
      break;
    case "png" || "jpg":
      icon = img;
      break;
    case "docx":
      icon = word;
      break;
    case "csv":
      icon = excel;
      break;
    case "ppt":
      icon = powerPoint;
      break;
    case "txt":
      icon = txt;
      break;
    default:
      icon = fileIcon;
  }
  const [isUpdateOpen, setUpdateOpen] = useState(false);
  const setUpdateOpenModal = (value: boolean) => {
    setUpdateOpen(value);
  };
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const setDeleteOpenModal = (value: boolean) => {
    setDeleteOpen(value);
  };

  return (
    <>
      {isDeleteOpen && (
        <ConfirmationModel
          isLoading={isLoading}
          isOpen={isDeleteOpen}
          onClose={() => {
            setDeleteOpenModal(false);
          }}
          title={"Are you sure you want to delete this file?"}
          onConfirm={async () => {
            await onDelete();
            window.location.reload();
            setDeleteOpen(false);
          }}
        />
      )}

      {isUpdateOpen && (
        <UpdateFileModel
          fileId={fileId}
          defaultValue={title}
          isLoading={isLoading}
          isOpen={isUpdateOpen}
          onClose={() => {
            setUpdateOpenModal(false);
          }}
        />
      )}
      <div className="flex flex-col gap-2 ">
        <div className="rounded-[6px] flex items-center justify-start p-4 text-textGray hover:bg-lightGray hover:bg-opacity-40 transition-all duration-500">
          <div className="flex gap-2 w-[18%] ">
            <Image src={icon} width={20} height={20} alt="document" />
            <p>{title}</p>
          </div>
          <p className="w-[18%] ">{uploadDate}</p>
          <p className="w-[18%] ">{lastModification}</p>
          <p className="w-[18%] ">{file_size}</p>
          <div className="flex gap-3">
            <FileActionButton
              onClick={() => {
                setUpdateOpen(true);
              }}
              hover="Edit file"
              icon={edit}
            />
            <FileActionButton
              onClick={() => {
                window.open(link, "_blank");
              }}
              hover="View file"
              icon={view}
            />

            <FileActionButton
              onClick={() => {
                handleDownload(link, `${title}.${fileType}`);
              }}
              hover="Download"
              icon={download}
            />

            <FileActionButton
              onClick={async () => {
                await navigator.clipboard.writeText(
                  `http://localhost:3000/share/${fileId}`
                );
                toast.success("Link has been copied successful!", {
                  position: "top-center",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
              hover="Share"
              icon={share}
            />
            <FileActionButton
              onClick={() => {
                setDeleteOpenModal(true);
              }}
              hover="Delete"
              icon={deleteFile}
            />
          </div>
        </div>
        <div className="h-[1px] bg-lightGray" />
      </div>
    </>
  );
};

export default FileComponent;
