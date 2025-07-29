
import React, { useState, useEffect } from 'react';
import WebsiteCard, { WebsiteCardProps } from './WebsiteCard';
import EnhancedMVPCard from './EnhancedMVPCard';
import { MVP, generateId } from '@/services/db';
import { WebsiteDetailsData } from '@/data/websiteData';

interface WebsiteGridProps {
  websites: WebsiteDetailsData[];
  selectedCategory: string;
}

// Convert old website data to MVP format
const convertToMVP = (website: WebsiteDetailsData): MVP => ({
  id: generateId(),
  title: website.title,
  description: website.description,
  longDescription: website.longDescription,
  websiteUrl: website.websiteUrl,
  imageUrl: website.imageUrl,
  category: website.category,
  creatorId: generateId(),
  creatorName: website.creatorName,
  creatorEmail: website.creatorEmail,
  creationDate: website.creationDate,
  upvotes: Math.floor(Math.random() * 50) + 10, // Random demo data
  comments: Math.floor(Math.random() * 20) + 2,
  reposts: Math.floor(Math.random() * 15) + 1,
  views: Math.floor(Math.random() * 500) + 50,
  technologies: website.technologies,
  additionalImages: website.additionalImages,
  ranking: 0 // Will be calculated
});

const WebsiteGrid: React.FC<WebsiteGridProps> = ({ websites, selectedCategory }) => {
  const [mvps, setMvps] = useState<MVP[]>([]);

  useEffect(() => {
    // Convert website data to MVP format
    const convertedMvps = websites.map(convertToMVP);
    setMvps(convertedMvps);
  }, [websites]);

  // Filter websites based on selected category
  const filteredMvps = selectedCategory === "All" 
    ? mvps 
    : mvps.filter(mvp => mvp.category === selectedCategory);

  const handleMVPUpdate = (updatedMVP: MVP) => {
    setMvps(prev => prev.map(mvp => mvp.id === updatedMVP.id ? updatedMVP : mvp));
  };

  const handleCommentClick = (mvpId: string) => {
    // TODO: Implement comment modal/sidebar
    console.log('Comment clicked for MVP:', mvpId);
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredMvps.map((mvp) => (
        <EnhancedMVPCard
          key={mvp.id}
          mvp={mvp}
          onMVPUpdate={handleMVPUpdate}
          onCommentClick={handleCommentClick}
        />
      ))}
    </div>
  );
};

export default WebsiteGrid;
