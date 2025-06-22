import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const NotFoundPage = () => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-green-200 px-4 py-8">
    <div className="bg-white p-8 md:p-10 rounded-xl shadow-lg flex flex-col items-center max-w-md w-full">
      <span className="text-6xl font-bold text-gray-400 mb-4">404</span>
      <h1 className="text-xl font-semibold mb-2 text-gray-700">This page could not be found</h1>
      <p className="text-gray-500 mb-6 text-center">
        Sorry, the page you’re looking for doesn’t exist or has been moved.
      </p>
      <Link to="/" className="w-full flex justify-center">
        <Button text="Go to Home" />
      </Link>
    </div>
  </div>
);

export default NotFoundPage;