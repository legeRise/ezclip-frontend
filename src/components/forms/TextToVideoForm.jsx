import React, { useState, useEffect, useRef } from "react";
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { generateVideoFromText, getStyles, getTemplates, recordFeedback } from '../../services/textToVideoService';
import api from '../../services/api';
import StatusMessage from "../ui/StatusMessage";
// import BannerAd from '../ads/BannerAd';

const TextToVideoForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);
  const [result, setResult] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [style, setStyle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("landscape");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false); // NEW: advanced dropdown toggle
  const [experimental, setExperimental] = useState(false);
  const pollingRef = useRef();


  async function recordFeedbackonError(message) {
    try {
      await recordFeedback(`[AUTOMATED FEEDBACK RECORDED] Error during video generation: ${message}`);
    } catch (error) {
      console.log("Failed to record feedback:", error.message);
    }
  }

  // Fetch styles on mount
  useEffect(() => {
    async function fetchStyles() {
      try {
        const data = await getStyles();
        setStyles(data || []); // Set styles from API response
        setStyle(data[0]?.name || ""); // Default to the first style
      } catch (error) {
        console.log(error.message)
        setStyles([]);
      }
    }
    fetchStyles();
  }, []);

  // Fetch templates on mount
  useEffect(() => {
    async function fetchTemplates() {
      try {
        const data = await getTemplates();
        setTemplates(data || []);
        setSelectedTemplate(data[0]?.name || ""); // Default to the first template
      } catch (error) {
        console.log(error.message);
        setTemplates([]);
      }
    }
    fetchTemplates();
  }, []);

  // Fetch languages on mount
  useEffect(() => {
    async function fetchLanguages() {
      try {
        const { data } = await api.get("/text2video/edge-tts/languages/");
        setLanguages(data.languages || []);
      } catch (error) {
        console.log(error.message)
        setLanguages([]);
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
      } catch (error) {
        console.log(error.message)
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
      const response = await generateVideoFromText(text, selectedLanguage, selectedVoice, aspectRatio, style, selectedTemplate, experimental);
      console.log("Generation started:", response);
      setResult(response.data);
    } catch (error) {
      if (error.status === 429) {
        setError("You have reached the generation limit for today. Please try again tomorrow.");
      }
      else {
    //   await recordFeedbackonError(error.message);
    //   setError(
    //   "Something went wrong on our side. We've recorded the issue. Your video may still be generating, so please check the My Creations page after a few minutes."
    // );
    setError(error.message)
      }
    } finally {
      setLoading(false);
    }
  };

  // SSE for tracking generation progress with auto-reconnect and user feedback
  useEffect(() => {
    if (!result?.tracker_id) return;

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    let tracker;
    let reconnectTimeout;
    let connectedTimeout;

    function connectSSE(isReconnect = false) {
      tracker = new EventSource(
        `${backendBaseUrl}/text2video/track-generation/${result.tracker_id}/`
      );

      tracker.onopen = () => {
        if (isReconnect) {
          setSuccess("Live progress reconnected!");
          // Hide the success message after 2 seconds
          connectedTimeout = setTimeout(() => setSuccess(null), 2000);
        }
        setWarning(null); // Clear any warning
      };

      tracker.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setResult(prev => ({ ...prev, ...data }));
          if (data.status && data.status.toUpperCase() === "COMPLETED") {
            setText('');
            tracker.close();
          }
        } catch (error) {
          console.log(error);
          setError("Failed to parse SSE data.");
          tracker.close();
        }
      };

      tracker.onerror = (err) => {
        console.log("SSE error:", err);
        setWarning("Live progress updates were interrupted. Attempting to reconnect...");
        tracker.close();
        reconnectTimeout = setTimeout(() => connectSSE(true), 3000); // Reconnect after 3 seconds
      };
    }

    connectSSE();

    return () => {
      if (tracker) tracker.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (connectedTimeout) clearTimeout(connectedTimeout);
    };
  }, [result?.tracker_id]);

  return (
    <form className="flex flex-col justify-center" onSubmit={handleSubmit}>
      {result && <ProgressBar progress={result?.progress || 0} statusMessage={result?.status_message || ""} />}
      {error && <StatusMessage message={error} type="error" />}
      {warning && <StatusMessage message={warning} type="warning" />}
      {success && <StatusMessage message={success} type="success" />}
      {info && <StatusMessage message={info} type="info" />}
      {/* Basic Options */}
      <div className="bg-white rounded-xl shadow p-4 mb-2 border border-gray-200">
        <div className="flex flex-col md:flex-row gap-2">
          <div className="flex-1 min-w-0">
            <label className="block text-sm text-gray-600 mb-1" htmlFor="language-select">Language</label>
            <select
              id="language-select"
              className="border rounded-lg p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-purple-300 transition"
              value={selectedLanguage}
              onChange={e => setSelectedLanguage(e.target.value)}
            >
              <option value="" disabled>Select Language</option>
              {languages.map(lang => (
                <option key={lang.code} value={lang.code} className="truncate">{lang.name}</option>
              ))}
            </select>
          </div>
          <div className="flex-1 min-w-0">
            <label className="block text-sm text-gray-600 mb-1" htmlFor="voice-select">Voice</label>
            <select
              id="voice-select"
              className="border rounded-lg p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-purple-300 transition"
              value={selectedVoice}
              onChange={e => setSelectedVoice(e.target.value)}
              disabled={!voices.length}
            >
              <option value="" disabled>Select Voice</option>
              {voices.map(voice => (
                <option key={voice} value={voice} className="truncate">{voice}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center min-w-0 pt-6 md:pt-0 md:pl-4">
            <input
              id="experimental-checkbox"
              type="checkbox"
              checked={experimental}
              onChange={e => setExperimental(e.target.checked)}
              className="h-4 w-4 text-purple-600 focus:ring-purple-400 border-gray-300 rounded"
            />
            <label htmlFor="experimental-checkbox" className="ml-2 text-sm text-gray-700 font-medium">
              Experimental
            </label>
          </div>
        </div>


        <button
          type="button"
          className="mt-4 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium w-full"
          onClick={() => setShowAdvanced(v => !v)}
        >
          {showAdvanced ? "Hide Advanced Customization" : "Show Advanced Customization"}
        </button>
      </div>
      {/* Advanced Options */}
      {showAdvanced && (
        <div className="bg-gray-50 rounded-xl shadow p-4 mb-2 border border-gray-200 animate-fade-in">
          <div className="font-semibold text-gray-700 mb-2">Advanced Options</div>
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 min-w-0">
              <label className="block text-sm text-gray-600 mb-1" htmlFor="aspect-select">Aspect Ratio</label>
              <select
                id="aspect-select"
                className="border rounded-lg p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-purple-300 transition"
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
              >
                <option value="" disabled>Select Aspect Ratio</option>
                <option value="landscape">LandScape (16:9)</option>
                <option value="portrait">Portrait (9:16)</option>
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm text-gray-600 mb-1" htmlFor="style-select">Style</label>
              <select
                id="style-select"
                className="border rounded-lg p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-purple-300 transition"
                value={style}
                onChange={e => setStyle(e.target.value)}
              >
                <option value="" disabled>Select Style</option>
                {styles.map(s => (
                  <option key={s.name} value={s.name}>{s.display_name}</option>
                ))}
              </select>
            </div>
            <div className="flex-1 min-w-0">
              <label className="block text-sm text-gray-600 mb-1" htmlFor="template-select">Template</label>
              <select
                id="template-select"
                className="border rounded-lg p-2 w-full bg-white text-gray-800 focus:ring-2 focus:ring-purple-300 transition"
                value={selectedTemplate}
                onChange={e => setSelectedTemplate(e.target.value)}
              >
                <option value="" disabled>Select Template</option>
                {templates.map(t => (
                  <option key={t.name} value={t.name}>{t.display_name || t.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
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
                controlsList="nodownload"
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
