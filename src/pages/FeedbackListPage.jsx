import { useEffect, useState, useRef, useCallback } from "react";
import FeedbackList from "../components/FeedbackList";
import { getFeedbackList } from "../services/textToVideoService";
import { Button } from "@/components/shadcn/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/shadcn/card";
import { Loader2, MessageSquare } from "lucide-react";

const FeedbackListPage = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const loader = useRef(null);

  // Fetch feedbacks (initial or paginated)
  const fetchFeedbacks = useCallback(async (url = null) => {
    setLoading(true);
    try {
      let response;
      if (url) {
        const res = await fetch(url);
        response = await res.json();
        setFeedbacks(prev => [...prev, ...(response.results || [])]);
        setNextUrl(response.next);
      } else {
        response = await getFeedbackList(10, 0);
        setFeedbacks(prev => [...prev, ...(response.data.results || [])]);
        setNextUrl(response.data.next);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
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
    const currentLoader = loader.current;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          fetchFeedbacks(nextUrl);
        }
      },
      { threshold: 1 }
    );
    if (currentLoader) observer.observe(currentLoader);
    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    };
  }, [nextUrl, loading, fetchFeedbacks]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <Card className="mb-8 text-center border-primary/10">
          <CardHeader className="pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
            </div>
            <CardTitle className="text-3xl md:text-4xl font-bold">
              Community Feedback
            </CardTitle>
            <CardDescription className="text-base mt-2 max-w-2xl mx-auto">
              Help us improve EzClip by sharing your thoughts, issues and experiences you are facing!
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Button size="lg" className="shadow-lg">
              <MessageSquare className="w-4 h-4 mr-2" />
              Submit Your Feedback
            </Button>
          </CardContent>
        </Card>

        {/* Feedback List */}
        <FeedbackList feedbacks={feedbacks} />

        {/* Loader Reference for Infinite Scroll */}
        <div ref={loader} />

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 text-muted-foreground py-8">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Loading more feedback...</span>
          </div>
        )}

        {/* End of List Message */}
        {!nextUrl && !initialLoad && feedbacks.length > 0 && (
          <Card className="mt-6 border-dashed">
            <CardContent className="py-6 text-center text-muted-foreground">
              You've reached the end of the feedback list.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FeedbackListPage;
