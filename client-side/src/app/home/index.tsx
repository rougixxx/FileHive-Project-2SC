"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import filter from "@/assets/icons/sort.svg";
import Button from "@/app/components/button/button";
import FileComponent from "@/app/components/home/file";
import UploadFileModel from "@/app/components/pop_ups/upload_file";
import SideBar from "../components/layout/side_bar";
import DashboardNav from "../components/layout/dashboard_nav";
import {
  deleteDocument,
  resetErrorAndStatus,
} from "@/lib/features/documents/documentSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

const HomePageMain = ({ files, userPic }: { files: any; userPic: string }) => {
  const dispatch: AppDispatch = useDispatch();

  const [filteredFiles, setFilteredFiles] = useState<
    {
      date_created: string;
      updated_date: string;
      file_type: string;
      file: string;
      size: string;
      title: string;
      id: string;
      file_size: string;
    }[]
  >([]);

  const [filtered, setFiltered] = useState("Filtered by last modified");
  const [isOpen, setOpen] = useState(false);
  const filters = [
    "Filtered by last modified",
    "Filtered by upload date",
    "Filtered alphabetically",
    "Filtered by size",
  ];
  const [isFilterOpen, setFilterOpen] = useState(false);
  const setOpenModal = (value: boolean) => {
    setOpen(value);
  };
  function convertSizeToBytes(size: string) {
    const units = ["kb", "mb", "gb"];
    const [value, unit] = size.split(" ");

    const unitIndex = units.indexOf(unit.toLowerCase());
    if (unitIndex === -1) {
      return parseFloat(value); // If no unit, assume bytes
    }

    // Convert to bytes: Kb -> *1024, Mb -> *1024^2, Gb -> *1024^3
    return parseFloat(value) * Math.pow(1024, unitIndex + 1);
  }

  const filterFiles = (
    filter: string | null,
    searchInput: string | null = null
  ) => {
    if (searchInput) {
      setFilteredFiles(
        files.filter((file: any) =>
          file.title.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
      return;
    }
    switch (filter) {
      case "Filtered by last modified":
        setFilteredFiles(
          files.sort(
            (a: any, b: any) =>
              new Date(b.updated_date).getTime() -
              new Date(a.updated_date).getTime()
          )
        );
        return;
      case "Filtered by upload date":
        setFilteredFiles(
          files.sort(
            (a: any, b: any) =>
              new Date(b.date_created).getTime() -
              new Date(a.date_created).getTime()
          )
        );
        return;
      case "Filtered alphabetically":
        setFilteredFiles(
          files.sort((a: any, b: any) => a.title.localeCompare(b.title))
        );
        return;
      case "Filtered by size":
        return setFilteredFiles(
          files.sort(
            (a: any, b: any) =>
              convertSizeToBytes(b.file_size) - convertSizeToBytes(a.file_size)
          )
        );
      default:
        setFilteredFiles(files);
        return;
    }
  };

  const document = useSelector((state: RootState) => state.documents);
  useEffect(() => {
    if (document.status === "succeeded") {
      dispatch(resetErrorAndStatus());
      toast.success("File update successful!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (document.status === "failed") {
      toast.error(document.error, {
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
  }, [dispatch, document.error, document.status]);

  useEffect(() => {
    filterFiles(filtered, null);
  }, []);

  return (
    <>
      {isOpen && (
        <UploadFileModel
          isLoading={document.status === "loading"}
          isOpen={isOpen}
          onClose={() => {
            setOpenModal(false);
          }}
        />
      )}
      <main className="flex">
        <SideBar />
        <div className="w-full flex flex-col gap-24 bg-lightGray">
          <DashboardNav pic={userPic} filterFileDate={filterFiles} />
          <section className="bg-white rounded-[14px] mx-8 p-6 flex flex-col gap-4">
            <div className="flex justify-between">
              <div
                onClick={() => {
                  setFilterOpen(!isFilterOpen);
                }}
                className="flex gap-4 hover:bg-lightGray rounded-[6px] hover:cursor-pointer items-center px-4 py-2 transition-all duration-500"
              >
                <Image src={filter} width={24} height={24} alt="sort" />
                <p className="relative text-black font-semibold text-xl">
                  {filtered}
                  {isFilterOpen && (
                    <div
                      className={` absolute top-12  -left-14  py-3 bg-lightGray  rounded-[6px]  text-base font-medium  text-mainInput flex flex-col`}
                    >
                      {filters
                        .filter((filter) => filter !== filtered)
                        .map((filter) => (
                          <p
                            key={filter}
                            className="hover:bg-background py-2 px-6"
                            onClick={() => {
                              setFiltered(filter);
                              filterFiles(filter, null);
                              setFilterOpen(false);
                            }}
                          >
                            {filter}
                          </p>
                        ))}
                    </div>
                  )}
                </p>
              </div>
              <Button
                onClick={() => {
                  setOpenModal(true);
                }}
                className="px-6"
                loading={false}
                text="Upload a file"
              />
            </div>
            <div className="bg-lightGray rounded-[6px] flex justify-start  p-4 text-textColor">
              <p className="w-[18%]">Name</p>
              <p className="w-[18%]">Upload date</p>
              <p className="w-[18%]">Last modification</p>
              <p className="w-[18%]">Size</p>
              <p className="w-[18%]">Action</p>
            </div>
            <div>
              {filteredFiles.map((file, index) => {
                const timestamp = file.updated_date;
                const date = new Date(timestamp);
                const timestamp2 = file.date_created;
                const date2 = new Date(timestamp2);
                return (
                  <FileComponent
                    isLoading={document.status === "loading"}
                    onDelete={async () => {
                      await dispatch(deleteDocument(file.id));
                    }}
                    file_size={file.file_size}
                    key={index}
                    fileId={file.id}
                    link={`http://localhost:8000${file.file}`}
                    uploadDate={`${date.getFullYear()}-${
                      date.getMonth() + 1
                    }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}
                    lastModification={`${date2.getFullYear()}-${
                      date2.getMonth() + 1
                    }-${date2.getDate()} ${date2.getHours()}:${date2.getMinutes()}`}
                    fileType={file.file_type}
                    title={file.title}
                  />
                );
              })}
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePageMain;
