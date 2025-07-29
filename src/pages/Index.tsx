
import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import WebsiteGrid from '../components/WebsiteGrid';
import Footer from '../components/Footer';
import { websiteData } from '../data/websiteData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Showcase Your MVP</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your startup MVP, get community feedback, and climb the rankings. Join the most supportive community for early-stage founders and their products.
          </p>
        </div>
        
        <div className="mb-10">
          <CategoryNav onSelectCategory={setSelectedCategory} />
        </div>

        <WebsiteGrid websites={websiteData} selectedCategory={selectedCategory} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
