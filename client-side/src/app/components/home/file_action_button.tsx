import Image from "next/image";

const FileActionButton = ({
  hover,
  icon,
  onClick,
}: {
  hover: string;
  icon: any;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={() => {
        onClick();
      }}
      className="relative hover:cursor-pointer group border-iconBacground border-[2px] p-[5px] flex justify-center items-center rounded-[9px]"
    >
      <Image src={icon} width={16} height={16} alt="action" />
      <div className="absolute  bg-lightGray rounded-lg px-4 py-1 hidden group-hover:flex w-[5.5rem] text-xs  items-center justify-center top-8">
        {hover}
      </div>
    </div>
  );
};

export default FileActionButton;
