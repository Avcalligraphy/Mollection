import React from "react";
import "./Button.css";

const Button = ({ className, value, onClick }) => {
  return (
    <button
      className={`border-0 bg-[#2928AF] text-[24px] text-white font-bold cursor-pointer rounded-[10px] ${className}`}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
