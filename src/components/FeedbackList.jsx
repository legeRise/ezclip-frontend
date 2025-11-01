const FeedbackList = ({ feedbacks }) => (
  <div className="max-w-3xl mx-auto my-10 px-4">
    <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-800 tracking-tight">User Feedback</h2>
    <div className="space-y-8">
      {feedbacks.length === 0 && (
        <div className="text-gray-400 text-center text-lg">No feedback yet.</div>
      )}
      {feedbacks.map((fb) => (
        <div
          key={fb.id}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg px-6 py-5 flex flex-col gap-3"
        >
          {/* Comment bubble */}
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <span className="inline-flex w-10 h-10 rounded-full bg-purple-100 text-purple-700 items-center justify-center font-bold text-xl shadow">
                <svg width="22" height="22" fill="currentColor" className="mx-auto" viewBox="0 0 20 20"><path d="M18 10c0 3.866-3.582 7-8 7a8.96 8.96 0 01-4.39-1.13l-3.07.82a1 1 0 01-1.23-1.23l.82-3.07A8.96 8.96 0 012 10c0-3.866 3.582-7 8-7s8 3.134 8 7z"></path></svg>
              </span>
            </div>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-xl px-5 py-3 text-gray-900 text-lg shadow-sm border border-gray-100">
                {fb.comment}
              </div>
              <div className="text-xs text-gray-400 mt-2 text-right">
                {new Date(fb.created_at).toLocaleString()}
              </div>
            </div>
          </div>
          {/* Response bubble, if exists */}
          {fb.response && (
            <div className="flex items-start gap-3 ml-12 mt-2">
              <div className="flex-shrink-0 mt-1">
                <span className="inline-flex w-10 h-10 rounded-full bg-green-100 text-green-700 items-center justify-center font-bold text-xl shadow">
                  <svg width="22" height="22" fill="currentColor" className="mx-auto" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V7h2v2z"></path></svg>
                </span>
              </div>
              <div className="flex-1">
                <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 text-green-800 text-base shadow-sm">
                  <span className="font-semibold">Response:</span> {fb.response}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);

export default FeedbackList;