import { useState, useEffect, useRef } from "react";
import { Button } from '@/components/shadcn/button';
import { Input } from '@/components/shadcn/input';
import { Label } from '@/components/shadcn/label';
import { Progress } from '@/components/shadcn/progress';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Card, CardContent } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
import { AlertCircle, CheckCircle2, Download, Loader2, Video, Info } from 'lucide-react';
import { generateVideoFromTitle } from '../../services/titleToVideoService';
import api from '../../services/api';

const TitleToVideoForm = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const pollingRef = useRef();

  const isValidTitle = /^top (3|5)\b/i.test(title.trim());
  const isGenerating = result?.tracker_id && result?.status?.toUpperCase() !== "COMPLETED";
  const isCompleted = result?.status?.toUpperCase() === "COMPLETED";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidTitle) {
      setError('Title must start with "Top 3" or "Top 5".');
      return;
    }
    setLoading(true);
    setError(null);
    setResult(null);
    try {
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

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Progress Section */}
      {result && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Generation Progress</span>
              <Badge variant={isCompleted ? "default" : "secondary"}>
                {isCompleted ? (
                  <>
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Completed
                  </>
                ) : (
                  <>
                    <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                    Processing
                  </>
                )}
              </Badge>
            </div>
            <Progress value={result?.progress || 0} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {result?.status_message || "Starting generation..."}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Title Input */}
      <div className="space-y-2">
        <Label htmlFor="title">Video Title</Label>
        <Input
          id="title"
          type="text"
          maxLength={120}
          placeholder='e.g. Top 3 Mountains in the World'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading || isGenerating}
          className="h-12"
        />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Info className="w-3 h-3" />
            <span>
              Title must start with{' '}
              <code className="px-1 py-0.5 bg-muted rounded text-primary font-mono">Top 3</code>
              {' '}or{' '}
              <code className="px-1 py-0.5 bg-muted rounded text-primary font-mono">Top 5</code>
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            {title.length} / 120
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12"
        disabled={loading || isGenerating || !title.trim()}
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Starting Generation...
          </>
        ) : isGenerating ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Generating Video...
          </>
        ) : (
          <>
            <Video className="w-4 h-4 mr-2" />
            Generate Video
          </>
        )}
      </Button>

      {/* Video Result */}
      <div className="mt-6">
        {result?.video_url ? (
          <Card>
            <CardContent className="pt-4 space-y-4">
              <div className="aspect-video rounded-lg overflow-hidden bg-black">
                <video
                  className="w-full h-full"
                  controls
                  controlsList="nodownload"
                  src={result.video_url}
                />
              </div>
              <Button asChild className="w-full">
                <a
                  href={result.video_url}
                  download
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Video
                </a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-dashed">
            <CardContent className="py-12 text-center">
              <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Video will appear here after generation
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </form>
  );
};

export default TitleToVideoForm;
