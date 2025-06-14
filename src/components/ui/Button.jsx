import React from "react";
import Spinner from "./Spinner";

const Button = ({ text, loading = false, icon = null, ...props }) => {
  const isDisabled = loading || props.disabled;
  return (
    <button
      className={`flex justify-center items-center bg-yellow-200 text-black font-semibold py-3 px-8 rounded-lg shadow transition min-w-[120px] ${
        isDisabled
          ? "opacity-50"
          : "hover:bg-yellow-300"
      }`}
      disabled={isDisabled}
      {...props}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <span className="flex items-center">
        {text}
        {loading && <span className="ml-2"><Spinner colorClass='border-blue-600' size={20} /></span>}
      </span>
    </button>
  );
};

export default Button;
