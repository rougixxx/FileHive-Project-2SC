import Image from "next/image";
import pdf from "@/assets/files/pdf.svg";
import img from "@/assets/files/image.png";
import word from "@/assets/files/word.svg";
import excel from "@/assets/files/excel.png";
import powerPoint from "@/assets/files/power_point.svg";
import fileIcon from "@/assets/files/file.png";
import txt from "@/assets/files/txt.png";

const FileName = ({
  title,
  fileType,
}: {
  title: string;
  fileType: string;
}) => {
  let icon;
  switch (fileType) {
    case "pdf":
      icon = pdf;
      break;
    case "img":
      icon = img;
      break;
    case "word":
      icon = word;
      break;
    case "excel":
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

  return (
    <>
      <div className="flex gap-2 w-[18%] ">
        <Image src={icon} width={20} height={20} alt="document" />
        <p>{title}</p>
      </div>
    </>
  );
};

export default FileName;
