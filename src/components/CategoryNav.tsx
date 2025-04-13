
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
    <div className="w-full border-b border-gray-200 pb-2 overflow-x-auto">
      <div className="flex space-x-1 min-w-max pb-1">
        {categories.map((category) => (
          <Button
            key={category}
            variant="ghost"
            size="sm"
            className={cn(
              "rounded-full px-4",
              activeCategory === category 
                ? "bg-blue-100 text-blue-700 hover:bg-blue-200" 
                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            )}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;
