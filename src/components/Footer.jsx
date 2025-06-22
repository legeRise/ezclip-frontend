import React from "react";

const Footer = () => (
  <footer className="bg-yellow-100 border-t border-yellow-200 py-6 mt-4">
    <div className="flex justify-center items-center">
      <span className="text-gray-700 text-sm font-semibold tracking-wide text-center">
        &copy; {new Date().getFullYear()} EzClip. All rights reserved.
      </span>
    </div>
  </footer>
);

export default Footer;