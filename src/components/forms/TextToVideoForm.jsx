import React, { useState, useEffect, useRef } from "react";
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { generateVideoFromText } from '../../services/textToVideoService';
import api from '../../services/api';

const TextToVideoForm = () => {
  const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const pollingRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateVideoFromText(text);
      console.log(data);
      setResult(data);
    } catch (err) {
      console.log(err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Polling for progress updates
  useEffect(() => {
    if (!result?.tracker_id) return;

    pollingRef.current = setInterval(async () => {
      try {
        const { data } = await api.get(`/text2video/track-generation/${result.tracker_id}/`);
        setResult(prev => ({ ...prev, ...data }));
        if (data.status.toUpperCase() === "COMPLETED") {
          setText('');
          clearInterval(pollingRef.current);
        }
      } catch (err) {
        setError("Failed to fetch progress.");
        clearInterval(pollingRef.current);
      }
    }, 2000);

    return () => clearInterval(pollingRef.current);
  }, [result?.tracker_id]);

  return (
    <form className="w-full max-w-3xl flex flex-col items-center justify-center" onSubmit={handleSubmit}>
      {result && <ProgressBar progress={result?.progress || 0} statusMessage={result?.status_message || ""} />}
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <textarea
        id="story-input"
        maxLength={1500}
        className="w-full h-60 md:h-80 p-4 border border-gray-300 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        placeholder="Paste your story or script here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div id="char-count" className="text-sm text-gray-500 mb-2 w-full text-right">
        {text.length} / 1500 characters
      </div>
      <Button
        type="submit"
        text="Generate Video"
        loading={loading}
        disabled={
          loading || (result?.tracker_id && result?.status?.toUpperCase() !== "COMPLETED")
        }

      />

      <div className="mt-4">
        {result?.video_url ? (
          <>
            <div className="flex justify-center">
              <video
                className="w-full h-auto max-w-3xl rounded-xl shadow"
                controls
                src={result.video_url}
              />
            </div>
            <div className="flex justify-center mt-2">
              <a
                href={result.video_url}
                download
                rel="noopener noreferrer"
              >
                <Button text="Download" type="button" />
              </a>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Video will appear here after generation
          </div>
        )}
      </div>



    </form>
  );
};

export default TextToVideoForm;
