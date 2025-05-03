import React, { useState } from "react";
import Button from '../ui/Button';

const TitleToVideoForm = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle title to video submission logic
    alert("Submitted title: " + title);
  };

  return (
    <form className="w-full max-w-3xl flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      <input
        type="text"
        maxLength={150}
        placeholder="Enter your title here..."
        className="w-full p-4 border border-gray-300 rounded-xl mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="text-sm text-gray-500 mb-2 w-full text-right">
        {title.length} / 150 characters
      </div>
      <Button type="submit" text="Generate Video" />
    </form>
  );
};

export default TitleToVideoForm;
