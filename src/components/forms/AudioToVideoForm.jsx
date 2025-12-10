import { useState, useRef } from "react";
import { Button } from '@/components/shadcn/button';
import { Label } from '@/components/shadcn/label';
import { Card, CardContent } from '@/components/shadcn/card';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Upload, Music, X, Video, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const AudioToVideoForm = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setError(null);
      } else {
        setError('Please upload a valid audio file.');
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setAudioFile(file);
        setError(null);
      } else {
        setError('Please upload a valid audio file.');
      }
    }
  };

  const handleRemoveFile = () => {
    setAudioFile(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!audioFile) {
      setError('Please upload an audio file.');
      return;
    }
    // TODO: Handle audio to video submission logic
    alert("Feature coming soon! Uploaded file: " + audioFile.name);
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* File Upload Area */}
      <div className="space-y-2">
        <Label>Upload Audio File</Label>
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer",
            isDragging 
              ? "border-primary bg-primary/5" 
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50",
            audioFile && "border-primary/50 bg-primary/5"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept="audio/*"
            className="hidden"
            onChange={handleFileChange}
          />
          
          <div className="flex flex-col items-center justify-center text-center min-h-[140px]">
            {audioFile ? (
              <>
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Music className="w-8 h-8 text-primary" />
                </div>
                <p className="font-medium text-foreground mb-1">{audioFile.name}</p>
                <p className="text-sm text-muted-foreground mb-3">
                  {formatFileSize(audioFile.size)}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFile();
                  }}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remove File
                </Button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="font-medium text-foreground mb-1">
                  Click or drag & drop to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports all audio formats (MP3, WAV, AAC, etc.)
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full h-12"
        disabled={!audioFile}
      >
        <Video className="w-4 h-4 mr-2" />
        Generate Video
      </Button>

      {/* Coming Soon Notice */}
      <Card className="border-dashed">
        <CardContent className="py-6 text-center">
          <p className="text-sm text-muted-foreground">
            🎵 Audio to Video feature is coming soon! Stay tuned for updates.
          </p>
        </CardContent>
      </Card>
    </form>
  );
};

export default AudioToVideoForm;
