import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const HomePage = ({ isAuthenticated }) => (
  <div className="min-h-screen bg-green-200 flex flex-col justify-center items-center px-4 py-8">
<h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 text-center drop-shadow-lg">
  Turn Text Into Stunning Videos With AI
</h1>
    <p className="text-xl md:text-2xl text-gray-700 mb-6 text-center max-w-2xl">
      Effortlessly turn your text, story, or script into stunning videos.
    </p>
    <Link to={isAuthenticated ? "/generate-video" : "/login"}>
      <Button text={isAuthenticated ? "Generate Video" : "Get Started"} />
    </Link>
    <div className="mt-10 w-full flex justify-center">
      <img
        src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
        alt="Video creation"
        className="w-full max-w-xs md:max-w-md rounded-lg"
        style={{ objectFit: "cover" }}
      />
    </div>
  </div>
);

export default HomePage;