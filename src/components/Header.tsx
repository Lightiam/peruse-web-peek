
import React from 'react';
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold text-blue-600">Peruse Web Peek</h1>
        </div>
        
        <div className="w-full sm:w-auto flex items-center gap-4">
          <div className="relative w-full sm:w-64 md:w-80">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input 
              type="text" 
              placeholder="Search websites..." 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button variant="default" className="hidden sm:flex bg-blue-600 hover:bg-blue-700">
            Add Website
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
