import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/shadcn/card';
import { Avatar, AvatarFallback } from '@/components/shadcn/avatar';
import { Badge } from '@/components/shadcn/badge';
import { Button } from '@/components/shadcn/button';
import { Separator } from '@/components/shadcn/separator';
import { ChevronDown, ChevronUp, MessageCircle, Reply, User } from 'lucide-react';

function FeedbackList({ feedbacks }) {
  const [expandedUsers, setExpandedUsers] = useState({});

  // Simple hash function to create consistent anonymized labels
  const anonymizedLabel = (email) => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = (hash << 5) - hash + email.charCodeAt(i);
      hash |= 0;
    }
    return `User ${Math.abs(hash % 10000)}`;
  };

  // Group feedbacks by user
  const groupedFeedbacks = useMemo(() => {
    const groups = {};
    feedbacks.forEach((feedback) => {
      const key = feedback.user;
      if (!groups[key]) {
        groups[key] = {
          label: anonymizedLabel(feedback.user),
          items: [],
        };
      }
      groups[key].items.push(feedback);
    });
    return groups;
  }, [feedbacks]);

  const toggleUser = (userKey) => {
    setExpandedUsers((prev) => ({
      ...prev,
      [userKey]: !prev[userKey],
    }));
  };

  const getInitials = (label) => {
    return label.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <MessageCircle className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No feedback submitted yet.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(groupedFeedbacks).map(([userKey, group]) => (
        <Card key={userKey} className="overflow-hidden">
          <CardHeader className="pb-3">
            <Button
              variant="ghost"
              className="w-full justify-between p-0 h-auto hover:bg-transparent"
              onClick={() => toggleUser(userKey)}
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 bg-primary/10">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm">
                    {getInitials(group.label)}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <CardTitle className="text-base font-medium">
                    {group.label}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {group.items.length} {group.items.length === 1 ? 'feedback' : 'feedbacks'}
                  </p>
                </div>
              </div>
              {expandedUsers[userKey] ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </Button>
          </CardHeader>

          {expandedUsers[userKey] && (
            <CardContent className="pt-0 space-y-4">
              <Separator />
              {group.items.map((feedback) => (
                <div key={feedback.id} className="space-y-3">
                  {/* User Feedback */}
                  <div className="flex gap-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="bg-muted rounded-lg rounded-tl-none p-3">
                        <p className="text-sm leading-relaxed">
                          {feedback.content}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{formatDate(feedback.created_at)}</span>
                        {!feedback.response && (
                          <Badge variant="outline" className="text-xs py-0">
                            Awaiting response
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Admin Response */}
                  {feedback.response && (
                    <div className="flex gap-3 pl-6">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center">
                          <Reply className="w-4 h-4 text-green-600" />
                        </div>
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg rounded-tl-none p-3">
                          <p className="text-sm leading-relaxed">
                            {feedback.response}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Badge variant="secondary" className="text-xs py-0">
                            Admin Response
                          </Badge>
                          {feedback.responded_at && (
                            <span>{formatDate(feedback.responded_at)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Separator between feedbacks from same user */}
                  {group.items.indexOf(feedback) < group.items.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  );
}

export default FeedbackList;
