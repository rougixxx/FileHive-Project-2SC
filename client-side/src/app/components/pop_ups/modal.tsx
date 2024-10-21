"use client";
import React, { ReactNode, useEffect, useRef } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode | JSX.Element | string | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  if (!isOpen) {
    return null;
  }

  return (
    <div
    className="z-20"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div
        ref={ref}
        style={{
          background: "white",
          borderRadius: "10px",
          padding: "20px",
          width: "80%",
          maxWidth: "500px",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
