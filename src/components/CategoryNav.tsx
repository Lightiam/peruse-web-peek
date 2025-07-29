
import React, { useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const categories = [
  "All",
  "Business",
  "Portfolio",
  "E-commerce",
  "Blog",
  "SaaS",
  "Landing Page",
  "Dashboard"
];

interface CategoryNavProps {
  onSelectCategory: (category: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({ onSelectCategory }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onSelectCategory(category);
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div className="flex flex-wrap justify-center gap-3 max-w-4xl">
        {categories.map((category) => (
          <button
            key={category}
            className={cn(
              "relative px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 transform hover:scale-105 overflow-hidden group",
              "before:absolute before:inset-0 before:rounded-full before:transition-all before:duration-300",
              activeCategory === category 
                ? "text-white shadow-lg hover:shadow-xl before:bg-gradient-to-r before:from-purple-600 before:to-blue-600 before:opacity-100" 
                : "text-gray-700 bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg border border-white/20 before:bg-gradient-to-r before:from-purple-600 before:to-blue-600 before:opacity-0 hover:before:opacity-100 hover:text-white"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {/* Glossy overlay effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
            
            {/* Animated shine effect */}
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            
            {/* Button text */}
            <span className="relative z-10">{category}</span>
            
            {/* Active indicator dot */}
            {activeCategory === category && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
