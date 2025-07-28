import React, { useState, useEffect, useRef } from "react";
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import StatusMessage from "../ui/StatusMessage";
import BannerAd from '../ads/BannerAd';
import { generateVideoFromTitle } from '../../services/titleToVideoService';
import api from '../../services/api';

const TitleToVideoForm = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [downloadClicked, setDownloadClicked] = useState(
    () => !!window.localStorage.getItem("downloadClicked")
  );
  const pollingRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if title starts with "Top 3" or "Top 5" (case-insensitive)
    if (!/^top (3|5)\b/i.test(title.trim())) {
      setError('Title must start with "Top 3" or "Top 5".');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      console.log(title);
      const data = await generateVideoFromTitle(title);
      setResult(data);
    } catch (err) {
      setError(err.message || "Failed to generate video.");
    } finally {
      setLoading(false);
    }
  };

  // Polling for progress updates
  useEffect(() => {
    if (!result?.tracker_id) return;

    pollingRef.current = setInterval(async () => {
      try {
        const { data } = await api.get(`/top5video/track-generation/${result.tracker_id}/`);
        setResult(prev => ({ ...prev, ...data }));
        if (data.status?.toUpperCase() === "COMPLETED") {
          setTitle('');
          clearInterval(pollingRef.current);
        }
      } catch (err) {
        setError("Failed to fetch progress.");
        clearInterval(pollingRef.current);
      }
    }, 5000);

    return () => clearInterval(pollingRef.current);
  }, [result?.tracker_id]);

  const handleDownloadClick = (e) => {
    if (!downloadClicked) {
      e.preventDefault();
      window.open(
        "https://otieu.com/4/9636677",
        "_blank"
      );
      setDownloadClicked(true);
      window.localStorage.setItem("downloadClicked", "1");
    }
    // else: allow normal download
  };

  return (
    <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
      {result && <ProgressBar progress={result?.progress || 0} statusMessage={result?.status_message || ""} />}
      {error && <StatusMessage message={error} type="error" />}
      <div className="mb-2 w-full">
        <input
          type="text"
          maxLength={120}
          placeholder='e.g. Top 3 Mountains in the World'
          className="w-full p-2 border border-gray-300 rounded-lg"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
<div className="text-xs text-green-700 mb-2 w-full flex flex-wrap gap-1">
  <span>
    Note: Title must start with <span className="font-semibold font-mono">Top 3</span> or <span className="font-semibold font-mono">Top 5</span>
    <span className="ml-2 text-gray-500"></span>
  </span>
</div>
      <div className="text-sm text-gray-500 mb-2 w-full text-right">
        {title.length} / 120
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
                controlsList="nodownload"
                src={result.video_url}
              />
            </div>
            <div className="flex justify-center mt-2">
              <a
                href={result.video_url}
                download
                rel="noopener noreferrer"
                onClick={handleDownloadClick}
              >
                <Button text="Download" type="button" />
              </a>
            </div>
          </>
        ) : (
          <div className="text-center text-gray-500">
            Video will appear here after generation
            <BannerAd />
          </div>
        )}
      </div>
    </form>
  );
};

export default TitleToVideoForm;
