
import React, { useState } from 'react';
import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import WebsiteGrid from '../components/WebsiteGrid';
import Footer from '../components/Footer';
import { websiteData } from '../data/websiteData';

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Modern Gradients */}
        <section className="relative overflow-hidden py-20 px-4">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 opacity-10"></div>
          <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full blur-3xl opacity-10"></div>
          
          <div className="relative container mx-auto text-center">
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
                Showcase Your MVP
              </h1>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Share your startup MVP, get community feedback, and climb the rankings. Join the most supportive community for early-stage founders and their products.
              </p>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 hover:from-purple-700 hover:to-blue-700">
                Submit Your MVP
              </button>
              <button className="px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-800 font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200">
                Explore MVPs
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">500+</div>
                <div className="text-gray-600 font-medium">MVPs Showcased</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">1000+</div>
                <div className="text-gray-600 font-medium">Community Members</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20">
                <div className="text-3xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">50K+</div>
                <div className="text-gray-600 font-medium">Feedback Given</div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories and Grid Section */}
        <section className="py-16 px-4 bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto">
            <div className="mb-10">
              <CategoryNav onSelectCategory={setSelectedCategory} />
            </div>
            <WebsiteGrid websites={websiteData} selectedCategory={selectedCategory} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
