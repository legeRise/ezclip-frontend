import React, { useState } from 'react';
import Button from '../ui/Button';

const CreationCard = ({ creation }) => {
  const [showScript, setShowScript] = useState(false);

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
          <pre className="mt-2 bg-gray-100 rounded p-2 text-gray-700 max-h-40 overflow-y-auto whitespace-pre-wrap break-words text-sm">
            {creation.script}
          </pre>
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

export default CreationCard;