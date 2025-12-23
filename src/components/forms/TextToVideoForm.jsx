import React, { useState, useEffect, useRef } from "react";
import { generateVideoFromText, getStyles, getTemplates, recordFeedback, getTtsServices, getTtsVoices } from '../../services/textToVideoService';
import api from '../../services/api';
import { Button } from '@/components/shadcn/button';
import { Label } from '@/components/shadcn/label';
import { Textarea } from '@/components/shadcn/textarea';
import { Progress } from '@/components/shadcn/progress';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Card, CardContent } from '@/components/shadcn/card';
import { Badge } from '@/components/shadcn/badge';
import { Checkbox } from '@/components/shadcn/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/shadcn/select';
import { 
  Loader2, 
  AlertCircle, 
  CheckCircle2, 
  AlertTriangle, 
  Info,
  ChevronDown,
  ChevronUp,
  Download,
  Sparkles,
  Languages,
  Mic,
  Palette,
  Layout,
  FlaskConical,
  Volume2
} from 'lucide-react';

const TextToVideoForm = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [warning, setWarning] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);
  const [result, setResult] = useState(null);
  
  // TTS Services state
  const [ttsServices, setTtsServices] = useState([]);
  const [selectedService, setSelectedService] = useState("edge");
  
  const [languages, setLanguages] = useState([]);
  const [voices, setVoices] = useState([]);
  const [styles, setStyles] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [style, setStyle] = useState("");
  const [aspectRatio, setAspectRatio] = useState("landscape");
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [experimental, setExperimental] = useState(false);
  const pollingRef = useRef();

  async function recordFeedbackonError(message) {
    try {
      await recordFeedback(`[AUTOMATED FEEDBACK RECORDED] Error during video generation: ${message}`);
    } catch (error) {
      console.log("Failed to record feedback:", error.message);
    }
  }

  useEffect(() => {
    async function fetchStyles() {
      try {
        const data = await getStyles();
        setStyles(data || []);
        setStyle(data[0]?.name || "");
      } catch (error) {
        console.log(error.message)
        setStyles([]);
      }
    }
    fetchStyles();
  }, []);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const data = await getTemplates();
        setTemplates(data || []);
        setSelectedTemplate(data[0]?.name || "");
      } catch (error) {
        console.log(error.message);
        setTemplates([]);
      }
    }
    fetchTemplates();
  }, []);

  // Fetch available TTS services on mount
  useEffect(() => {
    async function fetchTtsServices() {
      try {
        const services = await getTtsServices();
        setTtsServices(services || []);
      } catch (error) {
        console.log(error.message);
        // Fallback to Edge TTS if services endpoint fails
        setTtsServices([{ id: 'edge', name: 'Edge TTS', supports_languages: true }]);
      }
    }
    fetchTtsServices();
  }, []);

  // Fetch languages for Edge TTS
  useEffect(() => {
    if (selectedService !== 'edge') {
      setLanguages([]);
      setSelectedLanguage("");
      return;
    }
    async function fetchLanguages() {
      try {
        const { data } = await api.get("/text2video/edge-tts/languages/");
        setLanguages(data.languages || []);
      } catch (error) {
        console.log(error.message)
        setLanguages([]);
      }
    }
    fetchLanguages();
  }, [selectedService]);

  // Fetch voices based on selected TTS service and language
  useEffect(() => {
    async function fetchVoices() {
      try {
        if (selectedService === 'kokoro') {
          // Kokoro doesn't need language selection
          const data = await getTtsVoices('kokoro');
          setVoices(data.voices || []);
          setSelectedVoice(data.voices?.[0] || "");
        } else if (selectedService === 'edge' && selectedLanguage) {
          // Edge TTS requires language
          const data = await getTtsVoices('edge', selectedLanguage);
          setVoices(data.voices || []);
          setSelectedVoice("");
        } else {
          setVoices([]);
          setSelectedVoice("");
        }
      } catch (error) {
        console.log(error.message);
        setVoices([]);
        setSelectedVoice("");
      }
    }
    fetchVoices();
  }, [selectedService, selectedLanguage]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const response = await generateVideoFromText(
        text, 
        selectedService, 
        selectedLanguage, 
        selectedVoice, 
        aspectRatio, 
        style, 
        selectedTemplate, 
        experimental
      );
      console.log("Generation started:", response);
      setResult(response.data);
    } catch (error) {
      if (error.status === 429) {
        setError("You have reached the generation limit for today. Please try again tomorrow.");
      } else {
        setError(error.message)
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!result?.tracker_id) return;

    const backendBaseUrl = import.meta.env.VITE_BACKEND_BASE_URL;
    let tracker;
    let reconnectTimeout;
    let connectedTimeout;

    function connectSSE(isReconnect = false) {
      tracker = new EventSource(
        `${backendBaseUrl}/text2video/track-generation/${result.tracker_id}/`
      );

      tracker.onopen = () => {
        if (isReconnect) {
          setSuccess("Live progress reconnected!");
          connectedTimeout = setTimeout(() => setSuccess(null), 2000);
        }
        setWarning(null);
      };

      tracker.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          setResult(prev => ({ ...prev, ...data }));
          if (data.status && data.status.toUpperCase() === "COMPLETED") {
            setText('');
            tracker.close();
          }
        } catch (error) {
          console.log(error);
          setError("Failed to parse SSE data.");
          tracker.close();
        }
      };

      tracker.onerror = (err) => {
        console.log("SSE error:", err);
        setWarning("Live progress updates were interrupted. Attempting to reconnect...");
        tracker.close();
        reconnectTimeout = setTimeout(() => connectSSE(true), 3000);
      };
    }

    connectSSE();

    return () => {
      if (tracker) tracker.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      if (connectedTimeout) clearTimeout(connectedTimeout);
    };
  }, [result?.tracker_id]);

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      {/* Progress Bar */}
      {result && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-primary">{result?.status_message || "Processing..."}</span>
              <Badge variant="secondary">{result?.progress || 0}%</Badge>
            </div>
            <Progress value={result?.progress || 0} className="h-2" />
          </CardContent>
        </Card>
      )}

      {/* Status Messages */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {warning && (
        <Alert className="border-yellow-500/50 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">{warning}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert className="border-primary/50 bg-primary/10">
          <CheckCircle2 className="h-4 w-4 text-primary" />
          <AlertDescription className="text-primary">{success}</AlertDescription>
        </Alert>
      )}
      {info && (
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>{info}</AlertDescription>
        </Alert>
      )}

      {/* Basic Options */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* TTS Service Selection */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-muted-foreground" />
                TTS Service
              </Label>
              <Select value={selectedService} onValueChange={setSelectedService}>
                <SelectTrigger>
                  <SelectValue placeholder="Select TTS Service" />
                </SelectTrigger>
                <SelectContent>
                  {ttsServices.map(service => (
                    <SelectItem key={service.id} value={service.id}>{service.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Selection - Only show for Edge TTS */}
            {selectedService === 'edge' && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Languages className="h-4 w-4 text-muted-foreground" />
                  Language
                </Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map(lang => (
                      <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-muted-foreground" />
                Voice
              </Label>
              <Select value={selectedVoice} onValueChange={setSelectedVoice} disabled={!voices.length}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Voice" />
                </SelectTrigger>
                <SelectContent>
                  {voices.map(voice => (
                    <SelectItem key={voice} value={voice}>{voice}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="flex items-end">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="experimental" 
                  checked={experimental}
                  onCheckedChange={setExperimental}
                />
                <Label htmlFor="experimental" className="flex items-center gap-2 cursor-pointer">
                  <FlaskConical className="h-4 w-4 text-muted-foreground" />
                  Experimental
                </Label>
              </div>
            </div> */}
          </div>

          <Button
            type="button"
            variant="ghost"
            className="w-full mt-4"
            onClick={() => setShowAdvanced(v => !v)}
          >
            {showAdvanced ? (
              <>Hide Advanced Options <ChevronUp className="ml-2 h-4 w-4" /></>
            ) : (
              <>Show Advanced Options <ChevronDown className="ml-2 h-4 w-4" /></>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Advanced Options */}
      {showAdvanced && (
        <Card className="border-dashed animate-in fade-in-50">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Layout className="h-4 w-4 text-muted-foreground" />
                  Aspect Ratio
                </Label>
                <Select value={aspectRatio} onValueChange={setAspectRatio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Aspect Ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="landscape">Landscape (16:9)</SelectItem>
                    <SelectItem value="portrait">Portrait (9:16)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Palette className="h-4 w-4 text-muted-foreground" />
                  Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Style" />
                  </SelectTrigger>
                  <SelectContent>
                    {styles.map(s => (
                      <SelectItem key={s.name} value={s.name}>{s.display_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-muted-foreground" />
                  Template
                </Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map(t => (
                      <SelectItem key={t.name} value={t.name}>{t.display_name || t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Text Input */}
      <div className="space-y-2">
        <Textarea
          id="story-input"
          maxLength={1500}
          className="min-h-[250px] md:min-h-[300px] resize-none"
          placeholder="Paste your story or script here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end">
          <span className="text-sm text-muted-foreground">
            {text.length} / 1500 characters
          </span>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading || (result?.tracker_id && result?.status?.toUpperCase() !== "COMPLETED")}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate Video
          </>
        )}
      </Button>

      {/* Video Result */}
      <div className="mt-6">
        {result?.video_url ? (
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex justify-center bg-black">
                <video
                  className="w-full h-auto max-w-3xl"
                  controls
                  controlsList="nodownload"
                  src={result.video_url}
                />
              </div>
              <div className="p-4 flex justify-center">
                <a href={result.video_url} download rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download Video
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center text-muted-foreground py-8 border border-dashed rounded-lg">
            <Sparkles className="h-8 w-8 mx-auto mb-2 text-muted-foreground/50" />
            <p>Video will appear here after generation</p>
          </div>
        )}
      </div>
    </form>
  );
};

export default TextToVideoForm;
