import React, { useState } from "react";
import Button from '../ui/Button';

const AudioToVideoForm = () => {
  const [audioFile, setAudioFile] = useState(null);

  const handleFileChange = (e) => {
    setAudioFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle audio to video submission logic
    if (audioFile) {
      alert("Uploaded file: " + audioFile.name);
    } else {
      alert("Please upload an audio file.");
    }
  };

  return (
    <form className="w-full max-w-3xl flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <label
        htmlFor="audio-upload"
        className="w-full flex flex-col items-center justify-center border-2 border-dashed border-purple-400 rounded-xl p-8 bg-purple-50 cursor-pointer hover:bg-purple-100 transition mb-4"
        style={{ minHeight: '180px' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-purple-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-8m0 0l-3 3m3-3l3 3M21 16.5A2.5 2.5 0 0018.5 14H17v-2a5 5 0 00-10 0v2h-1.5A2.5 2.5 0 003 16.5v2A2.5 2.5 0 005.5 21h13a2.5 2.5 0 002.5-2.5v-2z" />
        </svg>
        <span className="text-purple-500 font-semibold text-lg mb-1">Click or drag & drop to upload audio</span>
        <span className="text-gray-500 text-sm">(Only audio files are accepted)</span>
        {audioFile && (
          <span className="mt-3 text-green-600 font-medium">Selected: {audioFile.name}</span>
        )}
        <input
          id="audio-upload"
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <Button type="submit" text="Generate Video" />
    </form>
  );
};

export default AudioToVideoForm;
