
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="font-bold text-xl text-blue-600">Peruse AI</h3>
            <p className="text-gray-500 text-sm mt-1">Showcasing beautiful websites and web apps.</p>
          </div>
          <div className="flex gap-6">
            <a href="/privacy-policy" className="text-gray-600 hover:text-blue-600">Privacy Policy</a>
            <a href="/cookie-policy" className="text-gray-600 hover:text-blue-600">Cookie Policy</a>
            <a href="/terms-of-service" className="text-gray-600 hover:text-blue-600">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-blue-600">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-gray-200 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Peruse AI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
