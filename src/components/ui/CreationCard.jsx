import React, { useState } from 'react';
import Button from '../ui/Button';

const TextToVideoCreationCard = ({ creation }) => {
  const [showScript, setShowScript] = useState(false);
  const [copied, setCopied] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(
    () => !!window.localStorage.getItem(`downloadClicked_${creation.id}`)
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(creation.script || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDownloadClick = (e) => {
    if (!downloadClicked) {
      e.preventDefault();
      window.open(
        "https://www.profitableratecpm.com/w1mmnuq0?key=ffc8c0830ebb222edc698605a3cc13aa",
        "_blank"
      );
      setDownloadClicked(true);
      window.localStorage.setItem(`downloadClicked_${creation.id}`, "1");
    }
    // else: allow normal download
  };

  return (
    <div className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">Status:</span>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${creation.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : creation.status === 'failed'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
        >
          {creation.status}
        </span>
      </div>
      <div>
        <button
          className="text-blue-600 underline text-sm focus:outline-none"
          onClick={() => setShowScript((s) => !s)}
        >
          {showScript ? 'Hide Script' : 'Show Script'}
        </button>
        {showScript && (
          <div className="relative mt-2">
            <pre className="bg-gray-100 rounded p-2 text-gray-700 max-h-40 overflow-y-auto whitespace-pre-wrap break-words text-sm">
              {creation.script}
            </pre>
            <Button
              className="absolute right-2 top-2 md:right-5 p-0"
              icon={
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
                  {copied ? (
                    <i className="fas fa-check text-green-700"></i>
                  ) : (
                    <i className="fas fa-copy"></i>
                  )}
                </span>
              }
              onClick={handleCopy}
              aria-label="Copy script"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span className="font-medium">Generated:</span>
        <span>{creation.generated_at}</span>
      </div>
      <div>
        {creation.is_video_available ? (
          <div className="flex justify-center mt-2">
            <a
              href={creation.video_url}
              download
              rel="noopener noreferrer"
              onClick={handleDownloadClick}
            >
              <Button text="Download" type="button" />
            </a>
          </div>
        ) : creation.status === 'completed' ? (
          <span className="text-yellow-600 italic">
            Video was removed from storage after an hour.
          </span>
        ) : (
          <span className="text-gray-400 italic">
            Video not available yet.
          </span>
        )}
      </div>
    </div>
  );
};

const TitleToVideoCreationCard = ({ creation }) => {
  const [copied, setCopied] = useState(false);
  const [downloadClicked, setDownloadClicked] = useState(
    () => !!window.localStorage.getItem(`downloadClicked_${creation.id}`)
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(creation.title || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const handleDownloadClick = (e) => {
    if (!downloadClicked) {
      e.preventDefault();
      window.open(
        "https://www.profitableratecpm.com/w1mmnuq0?key=ffc8c0830ebb222edc698605a3cc13aa",
        "_blank"
      );
      setDownloadClicked(true);
      window.localStorage.setItem(`downloadClicked_${creation.id}`, "1");
    }
    // else: allow normal download
  };

  return (
    <div className="border rounded-xl p-6 bg-white shadow-lg hover:shadow-2xl transition-shadow duration-200 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="text-lg font-bold text-gray-800">Status:</span>
        <span
          className={`px-2 py-1 rounded text-xs font-semibold ${creation.status === 'completed'
              ? 'bg-green-100 text-green-700'
              : creation.status === 'failed'
                ? 'bg-red-100 text-red-700'
                : 'bg-yellow-100 text-yellow-700'
            }`}
        >
          {creation.status}
        </span>
      </div>
      <div className="flex items-center gap-2 mt-2">
        <span className="font-mono text-green-700 text-base bg-blue-50 px-2 py-1 rounded break-words flex-1">{creation.title}</span>
        <Button
          className="p-0"
          icon={
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-200">
              {copied ? (
                <i className="fas fa-check text-green-700"></i>
              ) : (
                <i className="fas fa-copy"></i>
              )}
            </span>
          }
          onClick={handleCopy}
          aria-label="Copy title"
        />
      </div>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <span className="font-medium">Generated:</span>
        <span>{creation.generated_at}</span>
      </div>
      <div>
        {creation.is_video_available ? (
          <div className="flex justify-center mt-2">
            <a
              href={creation.video_url}
              download
              rel="noopener noreferrer"
              onClick={handleDownloadClick}
            >
              <Button text="Download" type="button" />
            </a>
          </div>
        ) : creation.status === 'completed' ? (
          <span className="text-yellow-600 italic">
            Video was removed from storage after an hour.
          </span>
        ) : (
          <span className="text-gray-400 italic">
            Video not available yet.
          </span>
        )}
      </div>
    </div>
  );
};

export { TextToVideoCreationCard, TitleToVideoCreationCard };