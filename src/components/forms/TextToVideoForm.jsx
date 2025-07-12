import React, { useState, useEffect, useRef } from "react";
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { generateVideoFromText } from '../../services/textToVideoService';
import api from '../../services/api';
import StatusMessage from "../ui/StatusMessage";
import BannerAd from '../ads/BannerAd';

const TextToVideoForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [aspectRatio, setAspectRatio] = useState("landscape");
  const [style, setStyle] = useState("stock_style");
  const [downloadClicked, setDownloadClicked] = useState(
    () => !!window.localStorage.getItem("downloadClicked")
  );
  const pollingRef = useRef();

  // Fetch languages on mount
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const { data } = await api.get("/text2video/edge-tts/languages/");
        setLanguages(data.languages || []);
      } catch (err) {
        // ignore error
      }
    }
    fetchLanguages();
  }, []);

  // Fetch voices when language changes
  useEffect(() => {
    if (!selectedLanguage) {
      setVoices([]);
      setSelectedVoice("");
      return;
    }
    async function fetchVoices() {
      try {
        const { data } = await api.get(`/text2video/edge-tts/voices/${selectedLanguage}/`);
        setVoices(data.voices || []);
        setSelectedVoice(""); // reset
      } catch (err) {
        setVoices([]);
      }
    }
    fetchVoices();
  }, [selectedLanguage]);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await generateVideoFromText(text, selectedLanguage, selectedVoice, aspectRatio, style);
      setResult(data);
    } catch (err) {
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

  const handleDownloadClick = (e) => {
    if (!downloadClicked) {
      e.preventDefault();
      window.open(
        "https://www.profitableratecpm.com/w1mmnuq0?key=ffc8c0830ebb222edc698605a3cc13aa",
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
      <div className="flex flex-col md:flex-row gap-2 mb-2">
        <select
          className="border rounded p-2"
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value)}
        >
          <option value="" disabled>Select Language</option>
          {languages.map(lang => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
        <select
          className="border rounded p-2"
          value={selectedVoice}
          onChange={e => setSelectedVoice(e.target.value)}
          disabled={!voices.length}
        >
          <option value="" disabled>Select Voice</option>
          {voices.map(voice => (
            <option key={voice} value={voice}>{voice}</option>
          ))}
        </select>
        <select
        className="border rounded p-2"
        value={aspectRatio}
        onChange={(e) => setAspectRatio(e.target.value)}
        >
          <option value="" disabled>Select Aspect Ratio</option>
          <option value="landscape">LandScape (16:9)</option>
          <option value="portrait">Portrait (9:16)</option>
        </select>
        <select
          className="border rounded p-2"
          value={style}
          onChange={e => setStyle(e.target.value)}
        >
          <option value="cartoon_2d">2D Cartoon Style</option>
          <option value="stock_style">Stock Style</option>
        </select>
      </div>
      <textarea
        id="story-input"
        maxLength={2000}
        className="w-full h-60 md:h-80 p-4 border border-gray-300 rounded-xl mb-2 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        placeholder="Paste your story or script here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div id="char-count" className="text-sm text-gray-500 mb-2 w-full text-right">
        {text.length} / 2000 characters
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

export default TextToVideoForm;
