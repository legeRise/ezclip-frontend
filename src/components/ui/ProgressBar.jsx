import React from "react";

/**
 * ProgressBar Component
 * Props:
 *   - progress: number (0-100)
 *   - statusMessage: string (status message)
 *   - className: string (optional Tailwind classes)
 */
const ProgressBar = ({ progress = 0, statusMessage = "", className = "" }) => (
  <div className={`w-full my-4 ${className}`}>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-cyan-600">{statusMessage}</span>
      <span className="text-sm font-medium text-cyan-600">{progress}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-green-600 h-3 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
