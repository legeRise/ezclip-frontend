import React, { useState, useEffect, useRef, useCallback } from 'react'
import api from '../../services/api';
import { TextToVideoCreationCard } from '../ui/CreationCard';
import { Button } from '@/components/shadcn/button';
import { Badge } from '@/components/shadcn/badge';
import { Alert, AlertDescription } from '@/components/shadcn/alert';
import { Loader2, RefreshCw, AlertCircle, Clock, Sparkles } from 'lucide-react';

const MyCreations = () => {
  const [text2videoCreations, setText2VideoCreations] = useState([]);
  const [text2videoCount, setText2VideoCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const loader = useRef(null);

  const fetchMyCreations = useCallback(async (url = null) => {
    setLoading(true);
    try {
      let data;
      if (url) {
        const { data: apiData } = await api.get(url);
        data = apiData;
      } else {
        const { data: apiData } = await api.get("/text2video/my-creations/");
        data = apiData;
      }
      setText2VideoCount(data.count || 0);
      setText2VideoCreations(prev => [...prev, ...(data.results.text2video || [])]);
      setNextUrl(data.next);
      setError(null);
    } catch (err) {
      console.log(err)
      setError('Failed to load creations.');
    } finally {
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    setText2VideoCreations([]);
    fetchMyCreations();
  }, [fetchMyCreations]);

  async function handleRefresh() {
    setRefreshing(true);
    setText2VideoCreations([]);
    await fetchMyCreations();
    setRefreshing(false);
  };

  useEffect(() => {
    if (!nextUrl) return;
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && !loading) {
          fetchMyCreations(nextUrl);
        }
      },
      { threshold: 1 }
    );
    if (loader.current) observer.observe(loader.current);
    return () => {
      if (loader.current) observer.unobserve(loader.current);
    };
  }, [nextUrl, loading, fetchMyCreations]);

  return (
    <div className="space-y-4">
      {/* Stats Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1">
            <Sparkles className="h-3 w-3 mr-1" />
            Total Generations: <span className="font-bold ml-1">{text2videoCount}</span>
          </Badge>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRefresh}
          disabled={loading || refreshing}
        >
          {refreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh
        </Button>
      </div>

      {/* Info Notice */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 px-4 py-2 rounded-lg">
        <Clock className="h-4 w-4" />
        <span>Videos are automatically deleted after 24 hours of generation</span>
      </div>

      {/* Error State */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Creations Grid */}
      <div className="max-h-[60vh] overflow-y-auto px-1 py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(loading || refreshing) && text2videoCreations.length === 0 ? (
            <>
              <div className="animate-pulse bg-muted rounded-xl h-48" />
              <div className="animate-pulse bg-muted rounded-xl h-48" />
            </>
          ) : text2videoCreations.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">No creations found. Start generating videos!</p>
            </div>
          ) : (
            text2videoCreations.map((c, i) =>
              <TextToVideoCreationCard key={c.id || c.uid || c.created_at || i} creation={c} />
            )
          )}
        </div>

        {/* Loader Sentinel */}
        <div ref={loader} />

        {/* Loading More */}
        {loading && text2videoCreations.length > 0 && (
          <div className="flex justify-center py-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}

        {/* End of List */}
        {!nextUrl && !initialLoad && text2videoCreations.length > 0 && (
          <p className="text-center text-sm text-muted-foreground py-4">
            No more creations to load
          </p>
        )}
      </div>
    </div>
  )
}

export default MyCreations
