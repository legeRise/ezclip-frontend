import React from "react";

/**
 * Badge component
 * Props:
 *  - text: string (badge label)
 *  - bgColor: Tailwind class for background color (default: 'bg-yellow-300')
 *  - textColor: Tailwind class for text color (default: 'text-yellow-900')
 *  - shadow: Tailwind class for shadow (default: 'shadow')
 *  - className: additional classes (e.g., ml-2, -mt-3 for floating effect)
 */
const Badge = ({
  text = "Coming Soon",
  bgColor = "bg-yellow-300",
  textColor = "text-yellow-900",
  shadow = "shadow",
  className = ""
}) => (
  <span
    className={`px-2 py-0.5 text-xs font-bold rounded-full ${bgColor} ${textColor} ${shadow} ${className}`}
  >
    {text}
  </span>
);


export default Badge;
