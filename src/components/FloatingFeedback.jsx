import React, { useState } from 'react';
import { recordFeedback } from '../services/textToVideoService';

const FloatingFeedback = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    try {
      await recordFeedback(input);
      setSubmitted(true);
      setTimeout(() => {
        setOpen(false);
        setInput('');
        setSubmitted(false);
      }, 1500);
    } catch (err) {
      setError('Failed to send feedback. Please try again.');
    }
  };

  return (
    <div>
      <button
        className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full shadow-lg p-3 z-50 hover:bg-green-600 transition focus:outline-none focus:ring-2 focus:ring-green-300"
        onClick={() => setOpen(!open)}
        aria-label="Feedback"
      >
        <span className="text-lg">💬</span>
      </button>
      {open && (
        <div className="fixed bottom-20 right-6 bg-white border border-green-200 rounded-2xl shadow-xl p-4 w-72 z-50 animate-fadeIn">
          <div className="font-semibold text-green-700 mb-2 text-base">Feedback</div>
          {!submitted ? (
            <form onSubmit={handleSend}>
              <textarea
                className="w-full border border-green-200 rounded-lg p-2 text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                placeholder="Share your experience to help me improve it..."
                value={input}
                onChange={e => setInput(e.target.value)}
                rows={3}
                maxLength={300}
              />
              {error && <div className="text-red-500 text-xs mb-1">{error}</div>}
              <button
                type="submit"
                className="bg-green-500 text-white rounded-full px-4 py-1 font-semibold hover:bg-green-600 transition w-full"
              >
                Send
              </button>
            </form>
          ) : (
            <div className="text-green-700 text-sm text-center">Thank you for your feedback!</div>
          )}
        </div>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.25s ease;
        }
      `}</style>
    </div>
  );
};

export default FloatingFeedback;
