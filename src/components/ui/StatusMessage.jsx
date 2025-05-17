import React from 'react';

const StatusMessage = ({ message, type = "info", className = "" }) => {
  // type: "error" | "success" | "info" | "warning"
  const colorMap = {
    error: "bg-red-100 border border-red-400 text-red-700",
    success: "bg-green-100 border border-green-400 text-green-700",
    info: "bg-blue-100 border border-blue-400 text-blue-700",
    warning: "bg-yellow-100 border border-yellow-400 text-yellow-700",
  };
  return (
    <div
      className={`px-4 py-3 mb-2 text-center rounded-md ${colorMap[type] || colorMap.info} ${className}`}
      role="alert"
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default StatusMessage;
