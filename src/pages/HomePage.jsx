import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/ui/Button";

const HomePage = ({ isAuthenticated }) => (
  <div className="min-h-screen bg-green-200 flex flex-col justify-center items-center px-4 py-8">
    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center drop-shadow-lg">
      EzClip - Where Your Words Become Stories
    </h1>
    <p className="text-xl md:text-2xl text-gray-700 mb-6 text-center max-w-2xl">
      Effortlessly turn your text, story, or script into stunning videos.
    </p>
    <Link to={isAuthenticated ? "/generate-video" : "/login"}>
      <Button text={isAuthenticated ? "Generate Video" : "Get Started"} />
    </Link>

    {/* Vertical Demo Videos Section */}
    <div className="mt-12 w-full max-w-4xl">
      <div className="font-bold text-2xl text-center mb-2 text-purple-700">
        Demo: Vertical Video Example
      </div>
      <div className="text-center text-gray-600 mb-4 text-sm">
        See how EzClip creates engaging vertical videos from your text.
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-4 w-full max-w-xs">
          <div className="font-semibold text-base text-purple-700 mb-2 text-center">
            What is Ezclip
          </div>
          <video
            src="/ezclip_demo_2.mp4"
            controls
            className="w-full rounded-lg border"
            style={{ background: "#000" }}
          />
          <div className="text-sm text-gray-600 mt-2 text-center">
            See how EzClip turns your text into videos in seconds.
          </div>
        </div>
      </div>
    </div>

    {/* Landscape Demo Videos Section */}
    <div className="mt-16 w-full max-w-4xl">
      <div className="font-bold text-2xl text-center mb-2 text-green-700">
        Demo: Landscape Video Example
      </div>
      <div className="text-center text-gray-600 mb-4 text-sm">
        Professional landscape videos generated with EzClip.
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col items-center bg-white rounded-xl shadow-lg p-4 w-full max-w-md">
          <div className="font-semibold text-base text-green-700 mb-2 text-center">
            A Teacher's Journey
          </div>
          <video
            src="/ezclip_demo.mp4"
            controls
            className="w-full rounded-lg border"
            style={{ objectFit: "cover", background: "#000" }}
          />
          <div className="text-xs text-gray-500 mt-2 text-center max-w-xs">
            “He tried editing — it drained his evenings. He tried hiring help —
            it drained his wallet. One night, frustrated, he typed his lesson
            into a strange website…”
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HomePage;