
import React, { useState, useEffect } from 'react';
import { DeveloperUser } from '@/services/db';
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { websiteData } from '@/data/websiteData';

interface DeveloperProfileViewProps {
  user: DeveloperUser;
  isOwnProfile?: boolean;
}

const DeveloperProfileView = ({ user, isOwnProfile = true }: DeveloperProfileViewProps) => {
  const navigate = useNavigate();
  const [developerProjects, setDeveloperProjects] = useState<any[]>([]);
  
  useEffect(() => {
    // For demo purposes, we'll show some sample projects from the websiteData
    // In a real app, you'd filter projects by the developer's ID
    const sampleProjects = websiteData
      .filter((_, index) => index < 3) // Just take first 3 for demo
      .map(website => ({
        ...website,
        status: ['Completed', 'In Progress', 'Completed'][Math.floor(Math.random() * 3)]
      }));
      
    setDeveloperProjects(sampleProjects);
  }, [user.id]);
  
  const handleViewProject = (websiteUrl: string) => {
    navigate(`/preview?url=${encodeURIComponent(websiteUrl)}`);
  };

  return (
    <div className="mb-6">
      <div className="bg-blue-50 p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold mb-2">Developer Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium text-gray-500">Skills</p>
            <p className="text-gray-700">{user.skills || "No skills listed"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Hourly Rate</p>
            <p className="text-gray-700">${user.hourlyRate || "0"}/hour</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Available for Chat</p>
            <p className="text-gray-700">{user.availableForChat ? "Yes" : "No"}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completed Projects</p>
            <p className="text-gray-700">{user.completedProjects || 0}</p>
          </div>
        </div>
      </div>

      {developerProjects.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Recent Projects</h3>
          <div className="space-y-3">
            {developerProjects.map((project, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 bg-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-900">{project.title}</h4>
                    <p className="text-sm text-gray-600 line-clamp-2">{project.description}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    project.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                </div>
                <div className="flex justify-end mt-3">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center gap-1"
                    onClick={() => handleViewProject(project.websiteUrl)}
                  >
                    <Eye size={14} />
                    View Project
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperProfileView;
