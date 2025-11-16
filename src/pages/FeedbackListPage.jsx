import React, { useEffect, useState, useRef, useCallback } from "react";
import FeedbackList from "../components/FeedbackList";
import { getFeedbackList } from "../services/textToVideoService";

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const loader = useRef(null);

  // Fetch feedbacks (initial or paginated)
  const fetchFeedbacks = useCallback(async (url = null) => {
    console.log("Fetching feedbacks from:", url || "initial load");
    setLoading(true);
    try {
      let response;
      if (url) {
        console.log("in the if part");
        const res = await fetch(url);
        response = await res.json();
        console.log("response data:", response,' using raw fetch');
        setFeedbacks(prev => [...prev, ...(response.results || [])]);
        setNextUrl(response.next);
      } else {
        console.log("in the else part");
        response = await getFeedbackList(10, 0); // initial load
        console.log("response data:", response,' using service function');
        setFeedbacks(prev => [...prev, ...(response.data.results || [])]);
        setNextUrl(response.data.next);
      }
      
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
      // Optionally handle error
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchFeedbacks();
  }, [fetchFeedbacks]);

  // Infinite scroll observer
  useEffect(() => {
    if (!nextUrl) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          fetchFeedbacks(nextUrl);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [nextUrl, loading, fetchFeedbacks]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-purple-900 mb-2">Community Feedback</h1>
          <p className="text-gray-600 text-lg">
            Help us improve EzClip by sharing your thoughts, issues and experiences you are facing!
          </p>
        </div>
        <FeedbackList feedbacks={feedbacks} />
        <div ref={loader} />
        {loading && (
          <div className="text-center text-gray-500 text-lg my-4">Loading more feedback...</div>
        )}
        {!nextUrl && !initialLoad && (
          <div className="text-center text-gray-400 text-sm my-4">No more feedback.</div>
        )}
      </div>
    </div>
  );
};

export default FeedbackListPage;