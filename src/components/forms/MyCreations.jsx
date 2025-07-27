import React, { useState, useEffect } from 'react'
import api from '../../services/api';
import { TextToVideoCreationCard, TitleToVideoCreationCard } from '../ui/CreationCard';
import Button from '../ui/Button';
import BannerAd from '../ads/BannerAd';



const MyCreations = ({ selectedType = 'text2video' }) => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [creations, setCreations] = useState([]);

  // Fetch languages on mount
  async function fetchMyCreations() {
    setLoading(true);
    try {
      const { data } = await api.get("/text2video/my-creations/");
      setCreations(data.creations);
    } catch (err) {
      console.log(err)
      setError('Failed to load creations.');
    } finally {
      // stop loading either way
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

  // Filter creations by selectedType
  const filteredCreations = creations.filter(c => c.type === selectedType);

  return (
    <>
    <div className="flex justify-end px-3 py-4 gap-2">
      <Button
       text="Refresh"
       onClick={handleRefresh}
       loading={refreshing}
       disabled={loading || refreshing}
      />
    </div>
    <BannerAd/>
    <div className="max-h-[60vh] overflow-y-auto px-2 py-4">
      {error && <div className="text-center text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        { (loading || refreshing) && filteredCreations.length === 0 ? (
          // Show skeletons or faded placeholders on initial load
          <>
            <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
            <div className="animate-pulse bg-gray-100 rounded-xl h-40" />
          </>
        ) : filteredCreations.length === 0 ? (
          <div className="col-span-2 text-center text-gray-400">No creations found.</div>
        ) : (
          filteredCreations.map((c, i) => (
              selectedType === 'text2video' ?
                <TextToVideoCreationCard key={i} creation={c} /> :
                <TitleToVideoCreationCard key={i} creation={c} />
            ))
        )}
      </div>
    </div>
    </>
  )
}

export default MyCreations