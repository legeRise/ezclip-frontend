import React, { useState, useEffect, useRef, useCallback } from 'react'
import api from '../../services/api';
import { TextToVideoCreationCard } from '../ui/CreationCard';
import Button from '../ui/Button';
// import BannerAd from '../ads/BannerAd';

const MyCreations = () => {
  const [text2videoCreations, setText2VideoCreations] = useState([]);
  const [text2videoCount, setText2VideoCount] = useState(0);
  const [nextUrl, setNextUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const loader = useRef(null);

  // Fetch creations (initial or paginated)
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

  // Initial load
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

  // Infinite scroll observer
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
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-2 text-sm">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
          {/* Total Generations: <b>{selectedTypeCount}</b> */}
          Total Generations: <b>{text2videoCount}</b>
        </span>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-gray-400 italic text-center">
          Videos are automatically deleted after 24 hours of generation
        </span>
      </div>
      <div className="flex justify-end px-3 py-4 gap-2">
        <Button
          text="Refresh"
          onClick={handleRefresh}
          loading={refreshing}
          disabled={loading || refreshing}
        />
      </div>
      {/* <BannerAd/> */}
      <div className="max-h-[60vh] overflow-y-auto px-2 py-4">
        {error && <div className="text-center text-red-500">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(loading || refreshing) && text2videoCreations.length === 0 ? (
            <>
              <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
              <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
            </>
          ) : text2videoCreations.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400">No creations found.</div>
          ) : (
            text2videoCreations.map((c, i) =>
                <TextToVideoCreationCard key={c.id || c.uid || c.created_at || i} creation={c} /> 
            )
          )}
        </div>
        <div ref={loader} />
        {loading && (
          <div className="text-center text-gray-500 text-lg my-4">Loading more creations...</div>
        )}
        {!nextUrl && !initialLoad && (
          <div className="text-center text-gray-400 text-sm my-4">No more creations.</div>
        )}
      </div>
    </>
  )
}

export default MyCreations