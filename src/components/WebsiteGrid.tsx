
import React from 'react';
import WebsiteCard, { WebsiteCardProps } from './WebsiteCard';

interface WebsiteGridProps {
  websites: WebsiteCardProps[];
  selectedCategory: string;
}

const WebsiteGrid: React.FC<WebsiteGridProps> = ({ websites, selectedCategory }) => {
  // Filter websites based on selected category
  const filteredWebsites = selectedCategory === "All" 
    ? websites 
    : websites.filter(website => website.category === selectedCategory);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredWebsites.map((website, index) => (
        <WebsiteCard
          key={index}
          title={website.title}
          description={website.description}
          imageUrl={website.imageUrl}
          websiteUrl={website.websiteUrl}
          category={website.category}
        />
      ))}
    </div>
  );
};

export default WebsiteGrid;
