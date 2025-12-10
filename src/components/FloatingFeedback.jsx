import React, { useState } from 'react';
import { recordFeedback } from '../services/textToVideoService';
import { Button } from '@/components/shadcn/button';
import { Textarea } from '@/components/shadcn/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { MessageCircle, Send, Loader2, CheckCircle2, X } from 'lucide-react';

const FloatingFeedback = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setError(null);
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Floating Button */}
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
        size="icon"
        onClick={() => setOpen(!open)}
        aria-label="Feedback"
      >
        {open ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>

      {/* Feedback Card */}
      {open && (
        <Card className="fixed bottom-24 right-6 w-80 z-50 shadow-xl animate-in slide-in-from-bottom-4 fade-in duration-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-primary" />
              Feedback
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!submitted ? (
              <form onSubmit={handleSend} className="space-y-3">
                <Textarea
                  placeholder="Share your experience to help us improve..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  rows={3}
                  maxLength={300}
                  disabled={loading}
                  className="resize-none"
                />
                <div className="flex justify-between items-center text-xs text-muted-foreground">
                  <span>{input.length}/300</span>
                  {error && <span className="text-destructive">{error}</span>}
                </div>
                <Button type="submit" className="w-full" disabled={loading || !input.trim()}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex flex-col items-center py-4 text-primary">
                <CheckCircle2 className="h-10 w-10 mb-2" />
                <span className="font-medium">Thank you for your feedback!</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FloatingFeedback;
