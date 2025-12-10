import React, { useState } from 'react';
import { Button } from '@/components/shadcn/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
import { 
  Check, 
  Copy, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  AlertTriangle
} from 'lucide-react';

const StatusBadge = ({ status }) => {
  const statusConfig = {
    completed: { variant: 'default', icon: CheckCircle2, className: 'bg-green-100 text-green-700 hover:bg-green-100' },
    failed: { variant: 'destructive', icon: XCircle, className: '' },
    processing: { variant: 'secondary', icon: Loader2, className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' },
    pending: { variant: 'secondary', icon: Clock, className: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100' }
  };
  
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;
  
  return (
    <Badge variant={config.variant} className={config.className}>
      <Icon className={`h-3 w-3 mr-1 ${status === 'processing' ? 'animate-spin' : ''}`} />
      {status}
    </Badge>
  );
};

const TextToVideoCreationCard = ({ creation }) => {
  const [showScript, setShowScript] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(creation.script || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Status</span>
          <StatusBadge status={creation.status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Script Toggle */}
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="px-0 text-primary hover:text-primary"
            onClick={() => setShowScript((s) => !s)}
          >
            {showScript ? (
              <>Hide Script <ChevronUp className="ml-1 h-4 w-4" /></>
            ) : (
              <>Show Script <ChevronDown className="ml-1 h-4 w-4" /></>
            )}
          </Button>
          
          {showScript && (
            <div className="relative mt-2">
              <pre className="bg-muted rounded-lg p-3 text-sm text-foreground max-h-40 overflow-y-auto whitespace-pre-wrap break-words">
                {creation.script}
              </pre>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8"
                onClick={handleCopy}
                aria-label="Copy script"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Generated Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{creation.generated_at}</span>
        </div>
      </CardContent>

      <CardFooter>
        {creation.is_video_available ? (
          <a
            href={creation.video_url}
            download
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </a>
        ) : creation.status === 'completed' ? (
          <Badge variant="destructive" className="ml-auto">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground italic">
            Video not available yet
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

const TitleToVideoCreationCard = ({ creation }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(creation.title || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">Status</span>
          <StatusBadge status={creation.status} />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Title */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-sm bg-muted px-3 py-2 rounded-lg break-words flex-1">
            {creation.title}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 flex-shrink-0"
            onClick={handleCopy}
            aria-label="Copy title"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-600" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Generated Time */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{creation.generated_at}</span>
        </div>
      </CardContent>

      <CardFooter>
        {creation.is_video_available ? (
          <a
            href={creation.video_url}
            download
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </a>
        ) : creation.status === 'completed' ? (
          <Badge variant="destructive" className="ml-auto">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        ) : (
          <span className="text-sm text-muted-foreground italic">
            Video not available yet
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export { TextToVideoCreationCard, TitleToVideoCreationCard };
