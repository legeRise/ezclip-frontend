import React, { useState, useEffect } from 'react'
import api from '../../services/api';
import { TextToVideoCreationCard, TitleToVideoCreationCard } from '../ui/CreationCard';
import Button from '../ui/Button';
// import BannerAd from '../ads/BannerAd';

const MyCreations = ({ selectedType = 'text2video' }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [text2videoCreations, setText2VideoCreations] = useState([]);
  const [top5videoCreations, setTop5VideoCreations] = useState([]);
  const [counts, setCounts] = useState({ text2video: 0, top5video: 0, total: 0 });

  async function fetchMyCreations() {
    setLoading(true);
    try {
      const { data } = await api.get("/text2video/my-creations/");
      setText2VideoCreations(data.text2video || []);
      setTop5VideoCreations(data.top5video || []);
      setCounts(data.count || { text2video: 0, top5video: 0, total: 0 });
    } catch (err) {
      console.log(err)
      setError('Failed to load creations.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMyCreations();
  }, []);

  async function handleRefresh() {
    setRefreshing(true);
    await fetchMyCreations();
    setRefreshing(false);
  };

  // Choose the correct list based on selectedType
  const creationsToShow = selectedType === 'text2video'
    ? text2videoCreations
    : top5videoCreations;

  const selectedTypeLabel = selectedType === 'text2video' ? 'Text2Video' : 'Title2Video';
  const selectedTypeCount = selectedType === 'text2video' ? counts.text2video : counts.top5video;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 mb-2 text-sm">
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded">
          Total Generations: <b>{selectedTypeCount}</b>
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
          {(loading || refreshing) && creationsToShow.length === 0 ? (
            <>
              <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
              <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
            </>
          ) : creationsToShow.length === 0 ? (
            <div className="col-span-2 text-center text-gray-400">No creations found.</div>
          ) : (
            creationsToShow.map((c, i) =>
              selectedType === 'text2video' ?
                <TextToVideoCreationCard key={i} creation={c} /> :
                <TitleToVideoCreationCard key={i} creation={c} />
            )
          )}
        </div>
      </div>
    </>
  )
}

export default MyCreations