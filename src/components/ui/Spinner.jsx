import React from "react";

// Simple, reusable spinner using Tailwind CSS
const Spinner = ({ size = 24, colorClass = "border-yellow-300", className = "" }) => (
  <div
    className={`inline-block rounded-full border-4 ${colorClass} border-t-transparent animate-spin ${className}`}
    style={{ width: size, height: size }}
    role="status"
    aria-label="Loading"
  />
);

export default Spinner;
