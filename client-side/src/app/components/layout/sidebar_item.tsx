import Link from "next/link";
import React from "react";

interface SideBarItemProps {
  isActive: boolean;
  title: string;
  icon: JSX.Element;
  pathToNavigate: any;
}

const SideBarItem = ({
  isActive,
  title,
  icon,
  pathToNavigate,
}: SideBarItemProps) => {
  const activeClasses = isActive
    ? "fill-primary stroke-primary text-primary font-medium"
    : "fill-gray stroke-gray text-gray font-normal";

  return (
    <Link href={pathToNavigate}>
      <div
        className={`relative flex items-center py-4 hover:cursor-pointer hover:bg-lightGray transition-all duration-700 justify-start pl-10`}
      >
        <div className="flex gap-8">
          {React.cloneElement(icon, { className: activeClasses })}

          <p className={`text-lg ${activeClasses}`}>{title}</p>
        </div>
        {isActive && (
          <div className="absolute left-0 bg-primary rounded-r-[10px] w-[6px] h-[60px]" />
        )}
      </div>
    </Link>
  );
};

export default SideBarItem;
