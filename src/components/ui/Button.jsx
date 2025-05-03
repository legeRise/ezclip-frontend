import React from "react";
import Spinner from "./Spinner";

const Button = ({ text, loading = false, ...props }) => {
  const isDisabled = loading || props.disabled;
  return (
    <button
      className={`flex items-center bg-yellow-200 text-black font-semibold py-3 px-8 rounded-lg shadow transition ${
        isDisabled
          ? "opacity-50"
          : "hover:bg-yellow-300"
      }`}
      disabled={isDisabled}
      {...props}
    >
      {text}
      {loading || isDisabled && <Spinner colorClass='border-blue-600' size={20} className="ml-2" />}
    </button>
  );
};

export default Button;
